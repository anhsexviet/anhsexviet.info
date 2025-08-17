// ===============================
// ✅ File: app/anh-sex/page.tsx – CollectionPage tối ưu performance + SEO mạnh cho AnhSexViet.info
// ===============================

import { getAllAlbums } from '@/lib/albums';
import AlbumCard from '@/components/AlbumCard';
import Link from "next/link";
import { slugify } from '@/lib/slugify';

// Helper top tag count
function getTopTags(albums: any[], n = 10): string[] {
  const tagCount: Record<string, number> = {};
  albums.forEach(a => {
    (a.tags || []).forEach((tag: string) => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });
  return Object.entries(tagCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([tag]) => tag);
}

const PER_PAGE = 18;

// ===============================
// SEO metadata động cho anhsexviet.info
// ===============================
export async function generateMetadata({ searchParams }: { searchParams?: { tag?: string; page?: string } }) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://anhsexviet.info";
  const albums = getAllAlbums();
  const tagSlug = searchParams?.tag;
  const page = searchParams?.page && searchParams.page !== "1" ? searchParams.page : undefined;

  let canonical = "/anh-sex";
  let title = "Tất cả Album Ảnh Sex Gái Việt | AnhSexViet.info";
  let description = "Tổng hợp bộ sưu tập album ảnh sex gái Việt, onlyfans, tự sướng tuyển chọn. Xem full bộ ảnh sex chất lượng cao, cập nhật mới mỗi ngày tại AnhSexViet.info.";
  if (tagSlug) {
    // Lấy tag gốc từ slug
    const tagGoc = albums.flatMap(a => a.tags || []).find(t => slugify(t) === tagSlug) || tagSlug;
    canonical += `?tag=${encodeURIComponent(tagSlug)}`;
    title = `Album "${tagGoc}" – Ảnh Sex Gái Việt | AnhSexViet.info`;
    description = `Bộ sưu tập album ảnh sex chủ đề "${tagGoc}". Ảnh gái Việt, onlyfans, tự sướng, cô giáo... cập nhật mới nhất tại AnhSexViet.info.`;
  }
  if (page) {
    canonical += (canonical.includes("?") ? "&" : "?") + `page=${page}`;
  }

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: base + canonical,
      images: [`${base}/og-default.jpg`],
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}

// ===============================
// Main Page
// ===============================
export default function AlbumPage({ searchParams }: { searchParams?: { page?: string; tag?: string } }) {
  const albums = getAllAlbums();
  const TOP_TAGS = getTopTags(albums, 10);

  const tagSlug = searchParams?.tag || "";
  const tagGoc = tagSlug
    ? albums.flatMap(a => a.tags || []).find(t => slugify(t) === tagSlug) || tagSlug
    : "";

  const filtered = tagSlug
    ? albums.filter(a => a.tags?.some(t => slugify(t) === tagSlug))
    : albums;

  const totalPage = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const page = Math.min(
    totalPage,
    Math.max(1, parseInt(searchParams?.page || "1", 10) || 1)
  );
  const pagedAlbums = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // JSON-LD CollectionPage structured data
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://anhsexviet.info";
  const collectionLD = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: tagSlug ? `Album "${tagGoc}" – AnhSexViet.info` : "Tất cả album ảnh sex – AnhSexViet.info",
    description: tagSlug
      ? `Bộ sưu tập album ảnh sex chủ đề "${tagGoc}" – AnhSexViet.info.`
      : "Tổng hợp album ảnh sex gái Việt tuyển chọn, cập nhật liên tục tại AnhSexViet.info.",
    url: base + "/anh-sex" + (tagSlug ? `?tag=${tagSlug}` : ""),
    hasPart: pagedAlbums.map((a: any, i: number) => ({
      "@type": "ImageGallery",
      name: a.title,
      url: base + "/anh-sex/" + a.slug,
      image: a.cover.startsWith("http") ? a.cover : base + (a.cover.startsWith("/") ? a.cover : "/" + a.cover),
      position: i + 1,
    })),
  };

  return (
    <main className="max-w-6xl mx-auto px-2 sm:px-4 py-6">
      {/* JSON-LD CollectionPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLD) }}
      />

      <h1 className="font-heading text-2xl md:text-3xl font-bold mb-2 text-white text-center">
        {tagSlug
          ? <>📸 Album <span className="text-pink-400">{tagGoc}</span></>
          : <>📸 Tất cả Album Ảnh Sex Gái Việt</>
        }
      </h1>
      {/* Số album kết quả */}
      <div className="text-center text-sm text-zinc-400 mb-5">
        {tagSlug
          ? (
            <>
              Có <b>{filtered.length}</b> album
              <span className="text-pink-400"> {tagGoc}</span>
              {filtered.length === 0 && <> – không tìm thấy album phù hợp.</>}
            </>
          )
          : (
            <>Tổng cộng <b>{albums.length}</b> album ảnh</>
          )
        }
      </div>

      {/* Filter tag hot */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <TagChip
          label="Tất cả"
          href="/anh-sex"
          active={!tagSlug}
        />
        {TOP_TAGS.map((t) => (
          <TagChip
            key={t}
            label={t}
            href={`/anh-sex?tag=${encodeURIComponent(slugify(t))}`}
            active={tagSlug === slugify(t)}
          />
        ))}
      </div>

      {/* Grid album cover – ảnh lớn trên fold, lazy các ảnh sau */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {pagedAlbums.length === 0 ? (
          <div className="col-span-full text-center text-zinc-400 py-12">
            Không tìm thấy album nào phù hợp.
          </div>
        ) : (
          pagedAlbums.map((album, i) => (
            <AlbumCard
              key={album.slug}
              {...album}
              // Truyền thêm prop để ảnh đầu tiên dùng eager, các ảnh còn lại lazy nếu muốn (nếu AlbumCard hỗ trợ)
              loading={i < 3 ? "eager" : "lazy"}
            />
          ))
        )}
      </div>

      {/* Pagination dưới grid */}
      <div className="flex justify-center items-center gap-1 mt-8">
        <PageLink page={page - 1} disabled={page === 1} tag={tagSlug}>Prev</PageLink>
        {Array.from({ length: totalPage }).map((_, i) => (
          <PageLink
            key={String(i + 1)}
            page={i + 1}
            active={page === i + 1}
            tag={tagSlug}
          >
            {i + 1}
          </PageLink>
        ))}
        <PageLink page={page + 1} disabled={page === totalPage} tag={tagSlug}>Next</PageLink>
      </div>
    </main>
  );
}

// Tag Chip component
function TagChip({
  label,
  href,
  active,
}: {
  label: string;
  href: string;
  active?: boolean;
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
      `}
      style={{ minWidth: 60, justifyContent: "center" }}
    >
      {label}
    </Link>
  );
}

// Pagination – chỉ Link, luôn truyền tagSlug
function PageLink({
  page,
  children,
  disabled,
  active,
  tag,
}: {
  page: number;
  children: React.ReactNode;
  disabled?: boolean;
  active?: boolean;
  tag?: string;
}) {
  if (disabled)
    return (
      <span className="px-2 py-1 rounded font-heading text-sm text-zinc-400 opacity-40 cursor-not-allowed">
        {children}
      </span>
    );
  if (active)
    return (
      <span className="px-2 py-1 rounded font-heading text-sm bg-pink-500 text-white">
        {children}
      </span>
    );
  let href = `/anh-sex?page=${page}`;
  if (tag) href += `&tag=${encodeURIComponent(tag)}`;
  return (
    <Link
      href={href}
      scroll={false}
      className="px-2 py-1 rounded font-heading text-sm text-zinc-400 hover:text-pink-400 transition"
    >
      {children}
    </Link>
  );
}
