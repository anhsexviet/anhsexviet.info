// ===============================
// ✅ File: app/robots.txt/route.ts (Next.js 14+) – Trả về robots.txt full control
// ===============================
export async function GET() {
  const body = `
User-agent: *
Allow: /

Sitemap: https://anhsexviet.info/sitemap.xml
Sitemap: https://anhsexviet.info/image-sitemap.xml
Sitemap: https://anhsexviet.info/video-sitemap.xml

# NOTICE: The collection of content and other data...
# BEGIN Cloudflare Managed Content
User-agent: Amazonbot
Disallow: /
User-agent: Applebot-Extended
Disallow: /
User-agent: Bytespider
Disallow: /
User-agent: CCBot
Disallow: /
User-agent: ClaudeBot
Disallow: /
User-agent: Google-Extended
Disallow: /
User-agent: GPTBot
Disallow: /
User-agent: meta-externalagent
Disallow: /
# END Cloudflare Managed Content
  `.trim();

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
