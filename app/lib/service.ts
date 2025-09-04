import { Redis } from '@upstash/redis';
import jwt from 'jsonwebtoken';

export function queryBook(term, page): Promise<{ data; message: string; totalPages }> {
  if (term === '') {
    // todo term
    return fetch(`/api/get-book?term=&page=${page}`).then((res) => res.json());
  }
  return fetch('/api/ai-search', { method: 'POST', body: JSON.stringify({ prompt: term }) }).then((res) =>
    res.json()
  );
}

export async function generateAccessToken(subject: any) {
  const redis = Redis.fromEnv();
  const accessToken = jwt.sign({ sub: subject }, process.env.JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = crypto.randomUUID();
  const ttl = 604800; // 7 days
  await redis.setex(`refresh:${refreshToken}`, ttl, subject);
  return { accessToken, refreshToken };
}

export async function refreshAccessToken(token: any) {
  try {
    const redis = Redis.fromEnv();
    const userId = await redis.get(`refresh:${token.refreshToken}`);

    if (!userId) throw new Error('Invalid refresh token');

    const newAccessToken = jwt.sign({ sub: userId }, process.env.JWT_SECRET!, {
      expiresIn: '15m',
    });

    return {
      ...token,
      accessToken: newAccessToken,
      accessTokenExpires: Date.now() + 900000,
    };
  } catch (error) {
    console.error('Refresh token failed', error);
    return { ...token, error: 'RefreshAccessTokenError' };
  }
}
