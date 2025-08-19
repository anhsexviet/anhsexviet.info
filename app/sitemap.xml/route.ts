// ===============================
// ✅ app/sitemap.xml/route.ts – Sitemap động chuẩn Google, indent gọn, date ISO, priority đồng nhất
// ===============================
import { getAllAlbums } from "@/lib/albums";
import { slugify } from "@/lib/slugify";

function normalizeDate(date: string | Date | undefined): string {
  // Nếu là string chỉ có YYYY-MM-DD → thêm T00:00:00Z
  if (!date) return new Date().toISOString().replace(/\.\d+Z$/, "Z");
  if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return date + "T00:00:00Z";
  }
  // Nếu đã là ISO string → chuyển về dạng chuẩn, bỏ ms
  return new Date(date).toISOString().replace(/\.\d+Z$/, "Z");
}

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://anhsexviet.info";
  const albums = getAllAlbums();
  const tagSet = new Set<string>();
  albums.forEach(a => (a.tags || []).forEach(t => tagSet.add(slugify(t))));

  const now = new Date().toISOString().replace(/\.\d+Z$/, "Z");

  // Tạo array URLs cho dễ kiểm soát, sau đó map thành XML
  const urls = [
    // Trang chủ
    {
      loc: `${base}/`,
      lastmod: now,
      changefreq: "daily",
      priority: "1.0",
    },
    // Trang tổng album
    {
      loc: `${base}/anh-sex`,
      lastmod: now,
      changefreq: "daily",
      priority: "0.95",
    },
    // Trang tổng video
    {
      loc: `${base}/video-sex`,
      lastmod: now,
      changefreq: "daily",
      priority: "0.9",
    },
    // Trang giới thiệu
    {
      loc: `${base}/gioi-thieu`,
      lastmod: now,
      changefreq: "monthly",
      priority: "0.5",
    },
    // Trang liên hệ
    {
      loc: `${base}/lien-he`,
      lastmod: now,
      changefreq: "monthly",
      priority: "0.5",
    },
    // Từng album
    ...albums.map(a => ({
      loc: `${base}/anh-sex/${a.slug}`,
      lastmod: normalizeDate(a.createdAt),
      changefreq: "weekly",
      priority: "0.8",
    })),
    // Từng tag
    ...Array.from(tagSet).map(slug => ({
      loc: `${base}/tag/${slug}`,
      lastmod: now,
      changefreq: "weekly",
      priority: "0.65",
    })),
  ];

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
      )
      .join("\n") +
    `\n</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
