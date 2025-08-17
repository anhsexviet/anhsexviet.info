// ===============================
// ✅ File: app/sitemap.ts – Sitemap động, canonical chuẩn SEO, Next.js App Router
// ===============================
import { getAllAlbums } from "@/lib/albums";
import { slugify } from "@/lib/slugify";

// Next.js sẽ tự map hàm này ra /sitemap.xml với đúng cấu trúc XML, không cần tự gen XML thủ công!

export default async function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const albums = getAllAlbums();

  // Lấy tập tag unique, slugify hết để route đúng canonical tag
  const tagSet = new Set<string>();
  albums.forEach(a => (a.tags || []).forEach(t => tagSet.add(slugify(t))));

  const now = new Date().toISOString();

  // Đảm bảo homepage, album, tag đều canonical
  return [
    // Homepage
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    // Trang tổng album (nên index mạnh!)
    {
      url: `${base}/anh-sex`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    // Trang tổng video (nếu có)
    {
      url: `${base}/video-sex`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.90,
    },
    // Trang giới thiệu + liên hệ (giúp Google crawl brand trust)
    {
      url: `${base}/gioi-thieu`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${base}/lien-he`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    // Từng album chi tiết
    ...albums.map(a => ({
      url: `${base}/anh-sex/${a.slug}`,
      lastModified: a.createdAt || now,
      changeFrequency: "weekly",
      priority: 0.8,
    })),
    // Trang tag canonical (SEO mạnh, không index ?page, chỉ index tag gốc)
    ...Array.from(tagSet).map(slug => ({
      url: `${base}/tag/${slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.65,
    })),
  ];
}
