import { generateText, experimental_createMCPClient as createMCPClient } from 'ai';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp';
import { Redis } from '@upstash/redis';

const MCP_SERVER_URL = 'https://book-mcp-server.vercel.app';

const redis = Redis.fromEnv();

export async function POST(req: Request) {
  const { prompt } = await req.json();
  if (!prompt) {
    return new Response(JSON.stringify({ error: 'Invalid input' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const mcp_url = new URL(`${MCP_SERVER_URL}/mcp`);

  let client;

  let access_token = await redis.get('mcp_access_token');

  if (!access_token) {
    // /api/token 这个应为login
    const res = await fetch(`${MCP_SERVER_URL}/api/token`, {
      method: 'POST',
      body: JSON.stringify({ user: process.env.MCP_USER }),
    });
    const { code, data } = await res.json();
    if (code === 0) {
      access_token = data.access_token;
      redis.setex('mcp_access_token', 3600, data.access_token);
    } else {
      console.error('fail to get mcp token');
    }
  }

  try {
    client = await createMCPClient({
      transport: new StreamableHTTPClientTransport(mcp_url, {
        requestInit: {
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        },
      }),
    });

    const model = createOpenAICompatible({
      apiKey: process.env.DASHSCOPE_API_KEY,
      baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
      name: 'qwen', // 都可以？
    });

    const result: any = await generateText({
      model: model.chatModel('qwen-plus'),
      system: 'You are a book search assistant.',
      tools: await client.tools(),
      prompt,
    });

    const { messages } = result.response;

    if (messages.length === 1 && messages[0].content[0].type === 'text') {
      return Response.json({ code: 0, data: [], message: messages[0].content[0].text });
    }
    if (messages[1] && messages[1].content[0].type === 'tool-result') {
      return Response.json({
        code: 0,
        data: JSON.parse(messages[1].content[0].result.content[0].text),
      });
    }
    return Response.json({ code: 0, data: [] });
  } catch (error) {
    console.log('ai search error:', error);
    return Response.json({ code: -1, data: [] });
  } finally {
    await client?.close();
  }
}
