// ===============================
// ✅ File: app/image-sitemap.ts – Dynamic Image Sitemap cho AnhSexViet.info (Next.js 14)
// ===============================
import { getAllAlbums } from "@/lib/albums";

/**
 * Encode title/text cho XML (Google yêu cầu không chứa ký tự lạ)
 */
function escapeXML(text: string) {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://anhsexviet.info";
  const albums = getAllAlbums();

  let xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

  for (const album of albums) {
    // Tạo URL tuyệt đối cho cover
    const coverUrl = album.cover.startsWith("http")
      ? album.cover
      : base + (album.cover.startsWith("/") ? album.cover : "/" + album.cover);

    xml += `
  <url>
    <loc>${base}/anh-sex/${album.slug}</loc>
    <image:image>
      <image:loc>${coverUrl}</image:loc>
      <image:title>${escapeXML(album.title)}</image:title>
    </image:image>
`;

    // Tạo URL tuyệt đối cho images[]
    (album.images || []).forEach((img: string, idx: number) => {
      const imgUrl = img.startsWith("http")
        ? img
        : base + (img.startsWith("/") ? img : "/" + img);
      xml += `
    <image:image>
      <image:loc>${imgUrl}</image:loc>
      <image:title>${escapeXML(album.title)} - Ảnh ${idx + 1}</image:title>
    </image:image>
`;
    });

    xml += `  </url>\n`;
  }

  xml += `</urlset>`;
  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      // "X-Robots-Tag": "noindex", // Không nên bật, để Google index sitemap
    },
  });
}
