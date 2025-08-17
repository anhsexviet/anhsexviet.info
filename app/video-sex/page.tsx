// ===============================
// 📁 File: app/video-sex/page.tsx – Video Sex Ngắn, SEO & Performance brand AnhSexViet.info
// ===============================

import { getAllAlbums } from "@/lib/albums";
import VideoGrid from "@/components/VideoGrid";
import Pagination from "@/components/Pagination";
import Link from "next/link";

const PER_PAGE = 18;

// ============================
// ✅ SEO: Metadata động mạnh nhất cho trang video sex ngắn
// ============================
export async function generateMetadata() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://anhsexviet.info";
  return {
    title: "Video Sex Ngắn – Clip Sex Cực Nóng, Tuyển Chọn Mới Nhất | AnhSexViet.info",
    description: "Tổng hợp video sex ngắn, clip sex Việt, Onlyfans, JAV, chất lượng cao – tải nhanh, xem miễn phí. Cập nhật mỗi ngày tại AnhSexViet.info.",
    alternates: { canonical: "/video-sex" },
    openGraph: {
      title: "Video Sex Ngắn – Clip Sex Tuyển Chọn | AnhSexViet.info",
      description: "Tuyển tập video sex ngắn cực nóng, tốc độ tải nhanh, chất lượng cao, cập nhật mới nhất tại AnhSexViet.info.",
      url: `${base}/video-sex`,
      images: [`${base}/og-default.jpg`],
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}

export default function VideoSexPage({ searchParams }: { searchParams?: { page?: string } }) {
  // 1. Lấy toàn bộ video từ tất cả album (phẳng mảng)
  const albums = getAllAlbums();
  const allVideos = albums
    .flatMap(album =>
      (album.videos || []).map(video => ({
        ...video,
        albumSlug: album.slug,
        albumTitle: album.title,
        // Fallback slug nếu thiếu: unique theo album + index
        slug: video.slug || `${album.slug}-${video.title?.replace(/\s+/g, "-").toLowerCase().slice(0,30)}`
      }))
    )
    .filter(v => !!v.videoUrl && !!v.thumbnail);

  // 2. Pagination (server-side slice)
  const totalPage = Math.max(1, Math.ceil(allVideos.length / PER_PAGE));
  const page = Math.min(
    totalPage,
    Math.max(1, parseInt(searchParams?.page || "1", 10) || 1)
  );
  const pagedVideos = allVideos.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // 3. JSON-LD VideoGallery schema mạnh SEO
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://anhsexviet.info";
  const videoGalleryLD = {
    "@context": "https://schema.org",
    "@type": "VideoGallery",
    name: "Video Sex Ngắn – AnhSexViet.info",
    url: `${base}/video-sex`,
    video: pagedVideos.map((v: any) => ({
      "@type": "VideoObject",
      name: v.title,
      description: v.title || "Video sex ngắn tuyển chọn – AnhSexViet.info",
      thumbnailUrl: v.thumbnail.startsWith("http") ? v.thumbnail : `${base}${v.thumbnail.startsWith("/") ? v.thumbnail : "/" + v.thumbnail}`,
      uploadDate: v.createdAt || undefined,
      contentUrl: v.videoUrl,
      url: `${base}/video/${v.slug || v.albumSlug}`,
      publisher: {
        "@type": "Organization",
        name: "AnhSexViet.info",
        url: base,
        logo: { "@type": "ImageObject", url: `${base}/og-default.jpg` }
      }
    })),
  };

  return (
    <main className="max-w-6xl mx-auto px-3 sm:px-6 py-8">
      {/* JSON-LD (SEO structured data) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGalleryLD) }}
      />
      <h1 className="font-heading text-2xl md:text-3xl font-bold mb-3 text-white text-center">
        🎥 Video Sex Ngắn Tuyển Chọn Mới Nhất
      </h1>
      <div className="text-center text-zinc-400 mb-6">
        Tổng cộng <b>{allVideos.length}</b> video sex ngắn • Trang <b>{page}</b>/<b>{totalPage}</b>
      </div>

      {/* Grid hiển thị video – performance tối ưu */}
      <VideoGrid videos={pagedVideos} />

      {/* Pagination – preload next page khi hover */}
      <div className="flex justify-center items-center gap-1 mt-8">
        <Pagination current={page} total={totalPage} />
      </div>

      <div className="mt-8 text-center">
        <Link href="/" className="inline-block text-pink-400 hover:text-white font-heading underline transition">
          ← Quay lại trang chủ
        </Link>
      </div>
    </main>
  );
}
