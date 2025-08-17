// ===============================
// ✅ File: app/robots.ts – Robots.txt động, Next.js 14, map tự động ra /robots.txt
// ===============================
export default function robots() {
  // Domain gốc (prod sẽ tự lấy đúng domain anhsexviet.info)
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Không cần disallow: đã canonical hóa, không trùng lặp nội dung
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
