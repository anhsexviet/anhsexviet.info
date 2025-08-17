// ===============================
// ✅ File: app/robots.txt/route.ts (Next.js 14+) – Trả về robots.txt full control
// ===============================
export async function GET() {
  const body = `
# NOTICE: The collection of content and other data on this
# site through automated means, including any device, tool,
# or process designed to data mine or scrape content, is
# prohibited except (1) for the purpose of search engine indexing or
# artificial intelligence retrieval augmented generation or (2) with express
# written permission from this site’s operator.

# To request permission to license our intellectual
# property and/or other materials, please contact this
# site’s operator directly.

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

User-agent: *
Allow: /

Sitemap: https://anhsexviet.info/sitemap.xml
Sitemap: https://anhsexviet.info/image-sitemap.xml
Sitemap: https://anhsexviet.info/video-sitemap.xml
  `.trim();

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
