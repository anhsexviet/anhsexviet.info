// ===============================
// ✅ File: app/page.tsx – Homepage chuẩn SEO + Performance cho anhsexviet.info
// ===============================

import { getAllAlbums } from "@/lib/albums";
import { slugify } from "@/lib/slugify";
import AlbumsExplorer from "@/components/AlbumsExplorer";
import ShortsRail from "@/components/ShortsRail";
import Pagination from "@/components/Pagination";
import Link from "next/link";
import Image from "next/image";

// =============================
// ✅ SEO homepage động (App Router)
// =============================
export async function generateMetadata({ searchParams }: { searchParams?: { tag?: string } }) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://anhsexviet.info";
  const albums = getAllAlbums();

  const selectedTag = searchParams?.tag;
  if (selectedTag) {
    const allLabels = Array.from(new Set(albums.flatMap((a) => a.tags || [])));
    const tagLabel = allLabels.find((t) => slugify(t) === slugify(selectedTag)) || selectedTag;
    return {
      title: `Album chủ đề ${tagLabel} | AnhSexViet.info – Ảnh Sex Gái Việt Cực Phẩm`,
      description: `Tuyển tập album ảnh sex chủ đề "${tagLabel}". Ảnh gái Việt, Onlyfans, tự sướng... full HD, cập nhật mới nhất.`,
      alternates: { canonical: `/tag/${slugify(selectedTag)}` },
      robots: { index: false, follow: true }, // Không index homepage query tag
      openGraph: {
        title: `Album chủ đề ${tagLabel} | AnhSexViet.info – Ảnh Sex Gái Việt Cực Phẩm`,
        description: `Tuyển tập album ảnh sex chủ đề "${tagLabel}".`,
        url: `${base}/tag/${slugify(selectedTag)}`,
        images: [`${base}/og-default.jpg`],
        type: "website",
      },
    };
  }
  // Homepage gốc
  return {
    title: "AnhSexViet.info – Web Ảnh Sex Gái Việt, Onlyfans, Tự Sướng Mỗi Ngày",
    description: "Tổng hợp album ảnh sex gái Việt, onlyfans leak, bộ tự sướng, chất lượng cao – cập nhật liên tục, xem miễn phí.",
    alternates: { canonical: "/" },
    openGraph: {
      title: "AnhSexViet.info – Web Ảnh Sex Gái Việt, Onlyfans, Tự Sướng Mỗi Ngày",
      description: "Tổng hợp album ảnh sex gái Việt, onlyfans leak, bộ tự sướng, chất lượng cao – cập nhật liên tục, xem miễn phí.",
      url: `${base}/`,
      images: [`${base}/og-default.jpg`],
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}

// ==============================
// Main homepage – POLISH PERFORMANCE
// ==============================
export default async function HomePage({
  searchParams,
}: {
  searchParams?: { page?: string; tag?: string };
}) {
  // ==== Lấy toàn bộ album, stats tổng (server-side) ====
  const albums = await getAllAlbums();

  const stats = {
    albums: albums.length,
    videos: albums.reduce((acc, a) => acc + (a.videos?.length || 0), 0),
    views: albums.reduce((acc, a) => acc + (a.views || 0), 0),
  };

  // ==== Tag filter động (Top 10 tag hot) ====
  const tags = getTopTags(albums, 10);
  const selectedTag = searchParams?.tag || "";

  // 🟢 FIX FILTER: So sánh slugify cho đúng chuẩn
  const filteredAlbums = selectedTag
    ? albums.filter((a) =>
        (a.tags || []).some((t) => slugify(t) === slugify(selectedTag))
      )
    : albums;

  // ==== Pagination logic ====
  const PER_PAGE = 12;
  const totalPage = Math.max(1, Math.ceil(filteredAlbums.length / PER_PAGE));
  const page = Math.min(
    totalPage,
    Math.max(1, parseInt(searchParams?.page || "1", 10) || 1)
  );
  const pagedAlbums = filteredAlbums.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );

  // ==== Album nổi bật (featured) ====
  const featuredAlbum = filteredAlbums[0] || albums[0];

  return (
    <main className="space-y-8">
      {/* ===== Hero Banner Featured ===== */}
      <section className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-tr from-zinc-900 via-zinc-800 to-zinc-900 shadow-xl mb-4 max-w-4xl mx-auto">
        {/* Dùng Image Next.js để lazy + preload LCP */}
        <Image
          src={featuredAlbum.cover}
          alt={featuredAlbum.title}
          fill
          className="absolute inset-0 object-cover opacity-40 blur-[2px] scale-105 transition-all duration-300"
          style={{ zIndex: 0 }}
          quality={70}
          priority // Ưu tiên preload (LCP)
          sizes="(max-width: 768px) 100vw, 700px"
        />
        <div className="relative z-10 p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <Image
            src={featuredAlbum.cover}
            alt={featuredAlbum.title}
            width={160}
            height={224}
            className="w-32 h-44 md:w-40 md:h-56 rounded-2xl object-cover shadow-xl border-4 border-pink-500/70"
            quality={80}
            priority
          />
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-white drop-shadow-md">
              {featuredAlbum.title}
            </h2>
            <div className="flex flex-wrap gap-2 my-2 justify-center md:justify-start">
              <span className="bg-pink-600 text-white px-2 py-0.5 rounded-full text-xs font-bold">HOT</span>
              <span className="bg-black/80 text-white px-2 py-0.5 rounded-full text-xs">18+</span>
              <span className="bg-green-500 text-white px-2 py-0.5 rounded-full text-xs">MỚI</span>
            </div>
            <p className="text-zinc-100 mt-2 line-clamp-2">
              {featuredAlbum.tags?.join(", ")}
            </p>
            <div className="flex gap-4 text-xs text-zinc-300 mt-3 justify-center md:justify-start">
              <span>
                👁️ {Number(featuredAlbum.views ?? 0).toLocaleString("en-US")} lượt xem
              </span>
              <span>🗓 {featuredAlbum.createdAt}</span>
            </div>
            <Link
              href={`/anh-sex/${featuredAlbum.slug}`}
              className="inline-block mt-5 px-5 py-2 rounded-full bg-pink-600 hover:bg-pink-500 text-white font-heading font-bold shadow-lg transition"
              prefetch={false}
            >
              👉 Xem ngay
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Stats tổng ===== */}
      <section className="flex flex-wrap items-center justify-center gap-6 text-center text-zinc-300 font-medium mb-2">
        <span>🖼️ <b>{stats.albums}</b> album ảnh</span>
        <span>🎥 <b>{stats.videos}</b> video sex ngắn</span>
        <span>
          👁️ <b>{Number(stats.views).toLocaleString("en-US")}</b> lượt xem
        </span>
      </section>

      {/* ===== Tag hot filter (Top 10) – dùng <Link> để SPA và hydrate chuẩn ===== */}
      <div className="flex flex-wrap justify-center gap-2 mb-5">
        <TagChip label="Tất cả" active={!selectedTag} href="/" />
        {tags.map((tag, idx) => (
          <TagChip
            key={tag}
            label={tag}
            href={`/?tag=${encodeURIComponent(slugify(tag))}`}
            active={slugify(selectedTag) === slugify(tag)}
            icon={idx === 0 ? "🔥" : idx < 3 ? "👑" : undefined}
          />
        ))}
      </div>

      {/* ===== Albums Grid + Pagination ===== */}
      <section className="max-w-6xl mx-auto px-2 sm:px-4">
        <AlbumsExplorer albums={pagedAlbums} />
        <Pagination current={page} total={totalPage} />
      </section>

      {/* ===== Video sex ngắn HOT (ShortsRail) ===== */}
      <section className="w-full max-w-5xl mx-auto px-2 sm:px-4 mt-10">
        <ShortsRail albums={albums.filter((a) => a.videos && a.videos.length > 0)} />
      </section>
    </main>
  );
}

// ===============================
// Tag Chip component – hiệu ứng đẹp, icon hot, dùng <Link> SPA
// ===============================
function TagChip({
  label,
  href,
  active,
  icon,
}: {
  label: string;
  href: string;
  active?: boolean;
  icon?: string;
}) {
  return (
    <Link
      href={href}
      scroll={false}
      className={`
        px-3 py-1 rounded-full border text-xs font-heading font-semibold transition
        ${active
          ? "bg-pink-600 border-pink-400 text-white shadow"
          : "bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-pink-500 hover:text-white"}
        flex items-center gap-1
      `}
      style={{ minWidth: 60, justifyContent: "center" }}
      prefetch={false}
    >
      {icon && <span>{icon}</span>}
      {label}
    </Link>
  );
}

// ===============================
// Helper: Top tag count
// ===============================
function getTopTags(albums: any[], limit = 10) {
  const tagCount: Record<string, number> = {};
  albums.forEach((a) => {
    a.tags?.forEach((tag: string) => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });
  return Object.entries(tagCount)
    .sort((a, b) => Number(b[1]) - Number(a[1]))
    .slice(0, limit)
    .map(([tag]) => tag);
}
