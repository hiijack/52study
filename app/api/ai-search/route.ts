import { generateText, experimental_createMCPClient as createMCPClient } from 'ai';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp';

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const server_url = new URL('https://book-mcp-server.vercel.app/mcp');

  let client;

  try {
    client = await createMCPClient({
      transport: new StreamableHTTPClientTransport(server_url),
    });

    const model = createOpenAICompatible({
      apiKey: process.env.DASHSCOPE_API_KEY,
      baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
      name: 'qwen', // 都可以？
    });

    const result: any = await generateText({
      model: model.chatModel('qwen-plus'),
      system: 'You are a book recommendation assistant.',
      tools: await client.tools(),
      prompt,
    });

    return Response.json({ result: result.response.messages });
  } catch (error) {
    console.log('ai search error:', error);
    return Response.json({ code: -1, result: [] });
  } finally {
    await client?.close();
  }
}
