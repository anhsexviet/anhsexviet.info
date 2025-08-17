// ===============================
// ✅ File: app/anh-sex/[slug]/page.tsx – Chi tiết album, tối ưu LCP, lazyload, chuẩn SEO mạnh nhất cho AnhSexViet.info
// ===============================

import { getAlbumBySlug, getAllAlbums } from "@/lib/albums";
import { notFound } from "next/navigation";
import GalleryClient from "./GalleryClient";
import Link from "next/link";
import { slugify } from "@/lib/slugify";

// ==========================
// SEO: Metadata, OpenGraph, Canonical động brand AnhSexViet.info
// ==========================
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const album = getAlbumBySlug(params.slug);
  if (!album) return {};
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://anhsexviet.info";
  // Luôn lấy ảnh cover full domain cho og:image
  const ogImg = album.cover
    ? album.cover.startsWith("http")
      ? album.cover
      : base + (album.cover.startsWith("/") ? album.cover : "/" + album.cover)
    : `${base}/og-default.jpg`;
  return {
    title: `${album.title} | AnhSexViet.info – Album Ảnh Sex Gái Việt`,
    description: album.tags?.length
      ? `Album "${album.title}" – chủ đề ${album.tags.join(", ")}. Ảnh sex gái Việt, onlyfans, tự sướng, cập nhật liên tục tại AnhSexViet.info.`
      : `Album "${album.title}" – Ảnh sex gái Việt tuyển chọn tại AnhSexViet.info.`,
    alternates: { canonical: `/anh-sex/${album.slug}` },
    openGraph: {
      title: `${album.title} | AnhSexViet.info`,
      description: album.tags?.length
        ? `Album chủ đề ${album.tags.join(", ")}. Ảnh sex gái Việt, onlyfans, tự sướng, cập nhật mới tại AnhSexViet.info.`
        : album.title,
      url: `${base}/anh-sex/${album.slug}`,
      images: [ogImg],
      type: "article",
    },
    robots: { index: true, follow: true },
  };
}

// =======================
// Hàm lấy album liên quan
// =======================
function getRelatedAlbums(currentSlug: string, tags: string[] = [], max = 6) {
  const all = getAllAlbums();
  let related = all.filter(
    (a) =>
      a.slug !== currentSlug &&
      a.tags &&
      a.tags.some((tag) => tags.includes(tag))
  );
  if (related.length < max) {
    const more = all.filter((a) => a.slug !== currentSlug && !related.includes(a));
    while (related.length < max && more.length > 0) {
      const pick = more.splice(Math.floor(Math.random() * more.length), 1)[0];
      if (pick) related.push(pick);
    }
  }
  return related.slice(0, max).sort(() => Math.random() - 0.5);
}

// =========================
// Main component chi tiết album
// =========================
export default function AlbumPage({ params }: { params: { slug: string } }) {
  const album = getAlbumBySlug(params.slug);
  if (!album) return notFound();

  const relatedAlbums = getRelatedAlbums(album.slug, album.tags, 4);
  const primaryTag = album.tags?.[0];

  // JSON-LD ImageGallery structured data
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://anhsexviet.info";
  const imageGalleryLD = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `${album.title} – Album ảnh sex gái Việt tại AnhSexViet.info`,
    datePublished: album.createdAt,
    url: `${base}/anh-sex/${album.slug}`,
    image: (album.images || []).map((img: any) =>
      typeof img === "string"
        ? img.startsWith("http")
          ? img
          : base + (img.startsWith("/") ? img : "/" + img)
        : img.src
    ),
    keywords: [
      ...(album.tags || []),
      "ảnh sex gái việt",
      "album sex",
      "tuyển chọn onlyfans",
      "tự sướng",
      "anhsexviet.info",
    ],
    description: album.title + (album.tags?.length ? " – " + album.tags.join(", ") : ""),
  };

  return (
    <main className="py-8">
      {/* JSON-LD cho SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageGalleryLD) }}
      />
      <div className="mx-auto w-full max-w-3xl px-4">
        {/* Tiêu đề + Info */}
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">{album.title}</h1>
        <div className="flex flex-wrap gap-3 text-xs text-zinc-400 mb-5">
          <span>👁️ {Number(album.views).toLocaleString("en-US")} lượt xem</span>
          <span>🗓 {album.createdAt}</span>
        </div>

        {/* Gallery ảnh + video (tối ưu: ảnh đầu tiên loading="eager" các ảnh khác lazy) */}
        <GalleryClient images={album.images} videos={album.videos} />

        {/* Block Tag – #Từ Khóa: */}
        {album.tags?.length > 0 && (
          <div className="bg-zinc-800 border-l-4 border-pink-500 px-4 py-2 my-7 rounded shadow-inner flex flex-wrap items-center gap-2">
            <span className="italic text-white/80">#Từ khóa:</span>
            <div className="flex flex-wrap gap-1">
              {album.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tag/${slugify(tag)}`}
                  prefetch={false}
                  className="inline-block bg-zinc-900 text-pink-400 hover:bg-pink-400 hover:text-white px-2 py-0.5 rounded-full text-xs font-semibold transition"
                  title={`Xem tất cả album tag "${tag}"`}
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Gợi ý album liên quan */}
        {relatedAlbums.length > 0 && (
          <section className="mt-8 mb-6 flex flex-col items-center">
            <h2 className="font-heading text-lg md:text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span>📸</span> Album liên quan
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full max-w-2xl">
              {relatedAlbums.map((a) => (
                <Link
                  key={a.slug}
                  href={`/anh-sex/${a.slug}`}
                  className="block rounded-xl overflow-hidden shadow bg-zinc-900 hover:shadow-pink-400/40 transition-transform hover:scale-[1.045]"
                  style={{ minWidth: "0" }}
                >
                  <img
                    src={a.cover}
                    alt={`${a.title} – Album liên quan AnhSexViet.info`}
                    className="w-full h-28 sm:h-32 object-cover object-center transition group-hover:brightness-105"
                    loading="lazy"
                    width={250}
                    height={160}
                    decoding="async"
                  />
                  <div className="px-2 py-1 text-xs text-white font-semibold truncate">{a.title}</div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Nút “Xem tất cả album tag ...” */}
        {primaryTag && (
          <div className="flex justify-center mt-2 mb-10">
            <Link
              href={`/tag/${slugify(primaryTag)}`}
              className="inline-block px-4 py-2 rounded-full bg-zinc-800 hover:bg-pink-500 text-pink-400 hover:text-white text-sm font-heading font-semibold transition"
              prefetch={false}
            >
              👉 Xem tất cả album tag "{primaryTag}"
            </Link>
          </div>
        )}

        {/* CTA crosslink truyện sex */}
        <div className="flex flex-col items-center mt-6">
          <a
            href="https://truyendam.net"
            className="inline-block px-5 py-2 rounded-full bg-pink-600 hover:bg-pink-500 text-white font-heading font-bold shadow-lg transition text-base"
            target="_blank"
            rel="noopener noreferrer"
          >
            👉 Đọc truyện sex cực nóng tại <span className="underline">Truyendam.net</span>
          </a>
          <div className="text-xs text-zinc-400 mt-1">
            Truyện 18+ full không giới hạn, cập nhật mỗi đêm!
          </div>
        </div>
      </div>
    </main>
  );
}
