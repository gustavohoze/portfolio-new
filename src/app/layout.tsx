import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Portfolio Redesign',
  description: 'Monochrome pixel-art portfolio',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        
        <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
      </body>
    </html>
  );
}
