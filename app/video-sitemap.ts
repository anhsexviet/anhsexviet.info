// ===============================
// ✅ File: app/video-sitemap.ts – Video Sitemap động cho AnhSexViet.info, chuẩn SEO Google
// ===============================
import { getAllAlbums } from "@/lib/albums";

function escapeCDATA(str: string) {
  return str.replace(/]]>/g, "]]]]><![CDATA[>");
}

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://anhsexviet.info";
  const albums = getAllAlbums();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n`;

  for (const album of albums) {
    (album.videos || []).forEach((video: any) => {
      // Phải có videoUrl + thumbnail (SEO Google)
      if (!video.videoUrl || !video.thumbnail) return;

      // Fallback title/description
      const title = escapeCDATA(video.title || album.title || "Video sex ngắn");
      const description = escapeCDATA(video.description || title);

      // Fallback slug (video hoặc album)
      const videoSlug = video.slug || album.slug;

      // Duration chuẩn giây (nếu có, không có bỏ qua)
      const duration = video.duration && !isNaN(Number(video.duration)) ? Math.floor(Number(video.duration)) : undefined;

      xml += `
  <url>
    <loc>${base}/video/${videoSlug}</loc>
    <video:video>
      <video:thumbnail_loc>${video.thumbnail}</video:thumbnail_loc>
      <video:title><![CDATA[${title}]]></video:title>
      <video:description><![CDATA[${description}]]></video:description>
      <video:content_loc>${video.videoUrl}</video:content_loc>
      ${video.createdAt || album.createdAt ? `<video:publication_date>${video.createdAt || album.createdAt}</video:publication_date>` : ""}
      ${duration ? `<video:duration>${duration}</video:duration>` : ""}
    </video:video>
  </url>
`;
    });
  }
  xml += `</urlset>`;
  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
