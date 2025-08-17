// ===============================
// ✅ File: components/VideoCard.tsx (dùng trong /video-sex)
// ===============================

"use client";

import Link from "next/link";

export type VideoCardProps = {
  slug: string;        // album slug để link
  title: string;
  thumbnail: string;
  duration?: string;
};

export default function VideoCard({ slug, title, thumbnail, duration }: VideoCardProps) {
  return (
    <Link
      href={`/anh-sex/${slug}#video`}
      className="group block overflow-hidden rounded-xl shadow-md hover:shadow-lg bg-zinc-900 transition-transform hover:scale-[1.01]"
    >
      <div className="relative aspect-[16/9] w-full">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {duration && (
          <span className="absolute bottom-1 right-1 text-xs bg-black/70 text-white px-1.5 py-0.5 rounded">
            {duration}
          </span>
        )}
      </div>
      <div className="p-3 text-white text-sm font-medium line-clamp-2">
        {title}
      </div>
    </Link>
  );
}
