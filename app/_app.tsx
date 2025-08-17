// File: app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Web Ảnh Sex Gái Việt',
  description: 'Tuyển chọn ảnh sex gái Việt, bộ ảnh 18+ mới nhất mỗi ngày',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <Header />
        <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}