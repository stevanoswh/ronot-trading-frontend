import './globals.css';
import { ReactNode } from 'react';

export const metadata = { title: 'Trading Strategy Config' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-100 p-6 dark:bg-gray-900 dark:text-gray-200">
        <div className="mx-auto max-w-4xl space-y-8">{children}</div>
      </body>
    </html>
  );
}