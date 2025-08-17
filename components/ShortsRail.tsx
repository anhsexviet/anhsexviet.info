// ===============================
// ✅ components/ShortsRail.tsx – Polish performance, tối ưu trải nghiệm, chuẩn brand AnhSexViet.info
// ===============================
"use client";
import Link from "next/link";
import type { Album } from "@/lib/albums";

type Props = {
  albums: Album[];
};

export default function ShortsRail({ albums }: Props) {
  // Lấy toàn bộ video từ album (giữ nguyên dạng mới nhất)
  const videos =
    albums
      ?.flatMap((album) =>
        (album.videos || []).map((video) => ({
          ...video,
          slug: album.slug,
        }))
      )
      .filter((v) => !!v.videoUrl && !!v.thumbnail) || [];

  if (!videos.length) return null;

  return (
    <section className="w-full mt-4">
      <h2 className="font-heading text-xl font-bold text-white mb-4">
        🎮 Video sex ngắn mới nhất
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent snap-x snap-mandatory">
        {videos.map((v, index) => (
          <Link
            key={index}
            href={`/anh-sex/${v.slug}#video`}
            prefetch={false}
            className="min-w-[160px] max-w-[180px] flex-shrink-0 rounded-xl overflow-hidden bg-zinc-900 hover:shadow-pink-400/40 transition-transform hover:scale-[1.05] group snap-start"
            title={`${v.title} – Xem video sex ngắn chất lượng tại AnhSexViet.info`}
            tabIndex={0}
          >
            <div className="relative aspect-[9/16] w-full h-auto">
              <img
                src={v.thumbnail}
                alt={`${v.title} – Video sex ngắn AnhSexViet.info`}
                className="w-full h-full object-cover group-hover:brightness-110 transition"
                loading="lazy"
                draggable={false}
              />
              {/* Play icon overlay */}
              <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <svg
                  width="38"
                  height="38"
                  viewBox="0 0 38 38"
                  fill="none"
                  className="opacity-80"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <circle cx="19" cy="19" r="19" fill="#111827" fillOpacity="0.55" />
                  <polygon points="15,12 28,19 15,26" fill="#fff" />
                </svg>
              </span>
              {/* Thời lượng video nếu có */}
              {"duration" in v && v.duration && (
                <span className="absolute bottom-1 right-1 text-xs bg-black/80 text-white px-1.5 py-0.5 rounded">
                  {v.duration}
                </span>
              )}
            </div>
            <div className="p-2 text-sm text-white line-clamp-2 leading-tight font-heading group-hover:text-pink-400 transition">
              {v.title}
            </div>
          </Link>
        ))}
      </div>
      <div className="text-right mt-2">
        <Link
          href="/video-sex"
          className="text-sm text-pink-400 hover:text-pink-300 font-heading transition"
          prefetch={false}
        >
          👉 Xem toàn bộ video sex
        </Link>
      </div>
    </section>
  );
}
