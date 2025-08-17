// ===============================
// ✅ File: app/layout.tsx – POLISH SEO + Performance cho AnhSexViet.info
// ===============================

import "../styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "AnhSexViet.info | Cực phẩm ảnh sex gái Việt, Onlyfans, video ngắn 18+",
  description: "AnhSexViet.info – website tổng hợp ảnh sex gái Việt, Onlyfans, tự sướng, video sex ngắn, cập nhật mới mỗi ngày, miễn phí, an toàn, ẩn danh.",
  openGraph: {
    title: "AnhSexViet.info – Ảnh sex gái Việt tuyển chọn",
    description: "Tuyển tập album ảnh sex, onlyfans, tự sướng, video sex ngắn 18+ miễn phí.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://anhsexviet.info",
    images: ["/og-default.jpg"],
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const base =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_SITE_URL || "https://anhsexviet.info";
  return (
    <html lang="vi">
      <head>
        {/* Google Fonts: Đảm bảo preload, tốc độ nhanh */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Montserrat:600,900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap"
          rel="stylesheet"
        />

        {/* Favicon – đa định dạng */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ea4c89" />

        {/* Viewport, canonical, theme */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="canonical" href={base} />
        <meta name="theme-color" content="#111" />

        {/* OG tags cơ bản – sẽ override bởi page-level nếu có */}
        <meta property="og:site_name" content="AnhSexViet.info" />
        <meta property="og:title" content="AnhSexViet.info – Ảnh sex gái Việt tuyển chọn" />
        <meta property="og:description" content="Tuyển tập album ảnh sex, onlyfans, tự sướng, video sex ngắn 18+ miễn phí." />
        <meta property="og:image" content="/og-default.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={base} />
      </head>
      <body className="bg-black text-white font-sans antialiased min-h-screen">
        <Header />
        <main className="max-w-screen-xl mx-auto px-2 sm:px-4 md:px-6 py-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
