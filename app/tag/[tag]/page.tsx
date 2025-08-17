// ===============================
// ✅ File: app/tag/[tag]/page.tsx – Trang tag SEO & Performance mạnh nhất, brand AnhSexViet.info
// ===============================

import { getAllAlbums } from "@/lib/albums";
import Link from "next/link";

// Số album/trang (tối ưu SEO + UX)
const PER_PAGE = 18;

// Slugify cho filter tiếng Việt (chuẩn hóa path/tag)
function slugify(text: string | undefined): string {
  if (!text) return "";
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Lấy label gốc từ slug
function unslugify(slug: string, tags: string[]): string {
  return tags.find((label) => slugify(label) === slug) || slug;
}

// ==========================
// SEO metadata động cho từng tag
// ==========================
export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { tag: string };
  searchParams?: { page?: string };
}) {
  const allAlbums = getAllAlbums();
  const allLabels = Array.from(new Set(allAlbums.flatMap((a) => a.tags || [])));
  const tagLabel = unslugify(decodeURIComponent(params.tag), allLabels);

  let canonical = `/tag/${params.tag}`;
  if (searchParams?.page && searchParams.page !== "1") {
    canonical += `?page=${searchParams.page}`;
  }

  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://anhsexviet.info";

  return {
    title: `Album "${tagLabel}" | AnhSexViet.info – Ảnh Sex Gái Việt, Chủ Đề ${tagLabel}`,
    description: `Tổng hợp album sex chủ đề "${tagLabel}" – full ảnh gái Việt, onlyfans, tự sướng, cô giáo... cập nhật mới nhất tại AnhSexViet.info.`,
    alternates: { canonical },
    openGraph: {
      title: `Album "${tagLabel}" | AnhSexViet.info`,
      description: `Ảnh sex chủ đề "${tagLabel}" – cập nhật liên tục tại AnhSexViet.info.`,
      url: `${base}${canonical}`,
      images: [`${base}/og-default.jpg`],
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}

// ==========================
// Trang hiển thị album theo tag, tối ưu performance
// ==========================
export default function TagPage({
  params,
  searchParams,
}: {
  params: { tag: string };
  searchParams?: { page?: string };
}) {
  const allAlbums = getAllAlbums();
  const tagSlug = decodeURIComponent(params.tag);
  const allLabels = Array.from(new Set(allAlbums.flatMap((a) => a.tags || [])));
  const tagLabel = unslugify(tagSlug, allLabels);

  // Lọc album theo tag (chuẩn hóa slug)
  const albums = allAlbums.filter(
    (a) => a.tags && a.tags.some((label) => slugify(label) === tagSlug)
  );

  // Pagination logic
  const totalPage = Math.max(1, Math.ceil(albums.length / PER_PAGE));
  const page = Math.min(
    totalPage,
    Math.max(1, parseInt(searchParams?.page || "1", 10) || 1)
  );
  const pagedAlbums = albums.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // Tag khác (gợi ý, không trùng tag hiện tại)
  const otherTags = allLabels.filter((label) => slugify(label) !== tagSlug);

  // JSON-LD ImageGallery (SEO cho tag)
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://anhsexviet.info";
  const imageGalleryLD = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `Album chủ đề ${tagLabel} – AnhSexViet.info`,
    url: `${base}/tag/${tagSlug}`,
    image: pagedAlbums.map((a) =>
      a.cover.startsWith("http")
        ? a.cover
        : base + (a.cover.startsWith("/") ? a.cover : "/" + a.cover)
    ),
    keywords: [
      tagLabel,
      "ảnh sex gái việt",
      "album sex",
      "onlyfans",
      "tự sướng",
      "anhsexviet.info",
    ],
    description: `Album ảnh sex chủ đề ${tagLabel} – full album chất lượng cao, cập nhật tại AnhSexViet.info.`,
  };

  return (
    <main className="w-full max-w-5xl mx-auto px-2 sm:px-4 py-6">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageGalleryLD) }}
      />
      {/* Headline đẹp cho tag */}
      <h1 className="font-heading text-2xl md:text-3xl font-bold mb-1 text-white text-center">
        💗 Album chủ đề <span className="text-pink-400">{tagLabel}</span>
      </h1>
      <div className="text-center text-sm text-zinc-400 mb-4">
        {albums.length === 0 ? (
          <>Chưa có album nào thuộc tag này.</>
        ) : (
          <>
            Có <b>{albums.length}</b> album • Trang <b>{page}</b>/{totalPage}
          </>
        )}
      </div>

      {/* Nút về Tất cả Album */}
      <div className="text-center mb-6">
        <Link
          href="/anh-sex"
          className="inline-block px-3 py-1 rounded-full bg-zinc-700 text-zinc-200 hover:bg-pink-500 hover:text-white font-heading text-xs transition"
        >
          ← Xem tất cả Album Ảnh Sex
        </Link>
      </div>

      {/* Grid album – fix bug không hiện ảnh, lazyload, path chuẩn */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {pagedAlbums.length === 0 ? (
          <div className="col-span-full text-center text-zinc-400 py-10">
            Hiện chưa có album nào cho tag <b className="text-pink-400">{tagLabel}</b>.<br />
            <span className="text-xs">
              Thử chọn tag khác ở bên dưới, hoặc{" "}
              <Link href="/anh-sex" className="underline text-pink-400 hover:text-pink-500">
                quay lại tất cả album
              </Link>.
            </span>
          </div>
        ) : (
          pagedAlbums.map((album, i) => (
            <Link
              key={album.slug}
              href={`/anh-sex/${album.slug}`}
              className="block rounded-xl overflow-hidden shadow bg-zinc-900 hover:shadow-pink-400/30 transition-transform hover:scale-[1.045]"
              style={{ minWidth: "0" }}
              tabIndex={0}
            >
          <img
  src={album.cover}
  alt={`${album.title} - Album chủ đề ${tagLabel} - Ảnh ${i + 1} | AnhSexViet.info`}
  className="w-full h-40 sm:h-44 object-cover object-center"
  loading="lazy"
  decoding="async"
  width={400}
  height={180}
  draggable={false}
/>
              <div className="px-2 py-1 text-xs text-white font-semibold truncate">{album.title}</div>
            </Link>
          ))
        )}
      </div>

      {/* Pagination dưới grid */}
      {albums.length > PER_PAGE && (
        <div className="flex justify-center items-center gap-1 mt-8">
          <PageLink tag={tagSlug} page={page - 1} disabled={page === 1}>
            Prev
          </PageLink>
          {Array.from({ length: totalPage }).map((_, i) => (
            <PageLink
              key={i + 1}
              tag={tagSlug}
              page={i + 1}
              active={page === i + 1}
            >
              {i + 1}
            </PageLink>
          ))}
          <PageLink tag={tagSlug} page={page + 1} disabled={page === totalPage}>
            Next
          </PageLink>
        </div>
      )}

      {/* Gợi ý tag khác */}
      {otherTags.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mt-10">
          {otherTags.slice(0, 14).map((label) => (
            <Link
              key={label}
              href={`/tag/${slugify(label)}`}
              className="px-3 py-1 rounded-full border bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-pink-500 hover:text-white text-xs font-heading font-semibold transition"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}

// ===============================
// Component cho pagination link – hiệu ứng, accessibility chuẩn
// ===============================
function PageLink({
  tag,
  page,
  children,
  disabled,
  active,
}: {
  tag: string;
  page: number;
  children: React.ReactNode;
  disabled?: boolean;
  active?: boolean;
}) {
  if (disabled)
    return (
      <span className="px-2 py-1 rounded font-heading text-sm text-zinc-400 opacity-40 cursor-not-allowed select-none">
        {children}
      </span>
    );
  if (active)
    return (
      <span className="px-2 py-1 rounded font-heading text-sm bg-pink-500 text-white select-none">
        {children}
      </span>
    );
  return (
    <Link
      href={`/tag/${tag}?page=${page}`}
      scroll={false}
      className="px-2 py-1 rounded font-heading text-sm text-zinc-400 hover:text-pink-400 transition"
    >
      {children}
    </Link>
  );
}
