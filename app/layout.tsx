import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Techneura ERP',
  description: 'Generic ERP mockup',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
