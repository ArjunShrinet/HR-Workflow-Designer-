import type { Metadata } from 'next';
import './globals.css';
import { ThemeInitializer } from '@/components/ui/ThemeInitializer';

export const metadata: Metadata = {
  title: 'HR Workflow Designer | Tredence',
  description: 'Visual HR workflow builder built with React Flow',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeInitializer />
        {children}
      </body>
    </html>
  );
}
