import React from 'react';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1, viewport-fit=cover"
        />
        <title>The Library</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
