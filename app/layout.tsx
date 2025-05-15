import React from 'react';
import { Redis } from '@upstash/redis';
import type { Viewport, Metadata } from 'next';
import './globals.css';

// const bootloader = `!function(){var t=localStorage.getItem("theme"),a=document.documentElement.classList;"light"===t?a.add("light"):"dark"===t&&a.add("dark")}();`;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'light' },
    { media: '(prefers-color-scheme: dark)', color: 'dark' },
  ],
};

export const metadata: Metadata = {
  title: 'The Library',
  description: '电子书资源',
};

const redis = Redis.fromEnv();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  redis.get('access_token').then((res) => {
    if (!res) {
      fetch('https://book-mcp-server.vercel.app/api/token', {
        method: 'POST',
        body: JSON.stringify({ user: process.env.MCP_USER }),
      })
        .then((res) => res.json())
        .then((res) => {
          const { code, data } = res;
          if (code !== 0) {
            console.error('fail to get mcp token');
          }
          redis.set('access_token', data.access_token, {
            ex: 3600,
          });
        });
    }
  });
  return (
    <html lang="en">
      <body className="bg-white dark:bg-gray-800 duration-150 ease-in-out">{children}</body>
    </html>
  );
}
