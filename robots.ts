// ===============================
// ✅ File: app/robots.ts (Next.js 14+) – Sinh động /robots.txt khi build
// ===============================
export default function robots() {
  // Tự lấy domain production từ ENV, fallback về local khi dev
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Đã canonical hóa, không cần disallow gì cả
      },
    ],
    sitemap: [`${base}/sitemap.xml`, `${base}/image-sitemap`, `${base}/video-sitemap`],
  };
}
