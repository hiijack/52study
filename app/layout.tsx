import React from 'react';
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
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-gray-800">{children}</body>
    </html>
  );
}
