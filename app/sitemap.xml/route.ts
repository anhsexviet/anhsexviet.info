// ===============================
// ✅ File: app/sitemap.xml/route.ts – Sitemap động, canonical chuẩn SEO, Next.js 14 App Router
// ===============================
import { getAllAlbums } from "@/lib/albums";
import { slugify } from "@/lib/slugify";

// Chú ý: PHẢI export async function GET(), trả về Response (application/xml)
export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://anhsexviet.info";
  const albums = getAllAlbums();

  // Tập tag unique, slugify hết
  const tagSet = new Set<string>();
  albums.forEach(a => (a.tags || []).forEach(t => tagSet.add(slugify(t))));

  const now = new Date().toISOString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Homepage
  xml += `
  <url>
    <loc>${base}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1</priority>
  </url>
  `;
  // Trang tổng album
  xml += `
  <url>
    <loc>${base}/anh-sex</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.95</priority>
  </url>
  `;
  // Trang tổng video
  xml += `
  <url>
    <loc>${base}/video-sex</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  `;
  // Trang giới thiệu + liên hệ
  xml += `
  <url>
    <loc>${base}/gioi-thieu</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${base}/lien-he</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  `;

  // Từng album
  for (const a of albums) {
    xml += `
    <url>
      <loc>${base}/anh-sex/${a.slug}</loc>
      <lastmod>${a.createdAt || now}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
    `;
  }

  // Trang tag canonical
  for (const slug of tagSet) {
    xml += `
    <url>
      <loc>${base}/tag/${slug}</loc>
      <lastmod>${now}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.65</priority>
    </url>
    `;
  }

  xml += `</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
