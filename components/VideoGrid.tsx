// ===============================
// 📁 File: components/VideoGrid.tsx
// 👉 Hiển thị grid video: responsive, tối ưu thumbnail, lazyload
// ===============================
import Link from "next/link";

// VideoMeta lấy từ video của album
export type VideoMeta = {
  title: string;
  thumbnail: string;
  videoUrl: string;
  duration?: string;
  albumSlug?: string;
  albumTitle?: string;
};

export default function VideoGrid({ videos }: { videos: VideoMeta[] }) {
  if (!videos?.length) return <div className="text-center text-zinc-400 py-10">Chưa có video nào.</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {videos.map((v, i) => (
        <Link
          key={v.videoUrl + i}
          href={`/anh-sex/${v.albumSlug}#video`}
          className="block bg-zinc-900 rounded-xl overflow-hidden shadow group hover:shadow-pink-500/20 transition"
          prefetch={false}
        >
          <div className="relative aspect-[9/16] w-full">
            <img
              src={v.thumbnail}
              alt={v.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform"
            />
            {/* Duration góc phải dưới */}
            {v.duration && (
              <span className="absolute bottom-1 right-1 text-xs bg-black/80 text-white px-1.5 py-0.5 rounded">{v.duration}</span>
            )}
          </div>
          <div className="px-2 py-1 text-sm text-white font-semibold truncate">{v.title}</div>
          {v.albumTitle && (
            <div className="px-2 pb-1 text-xs text-zinc-400 truncate">Album: {v.albumTitle}</div>
          )}
        </Link>
      ))}
    </div>
  );
}
