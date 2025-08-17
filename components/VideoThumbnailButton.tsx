// ===============================
// ✅ File mới: components/VideoThumbnailButton.tsx
// ===============================

"use client";

import React from "react";

interface Props {
  thumbnail: string;
  title: string;
  duration?: string;
  onClick: () => void;
}

export default function VideoThumbnailButton({ thumbnail, title, duration, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative block w-full aspect-[9/16] overflow-hidden rounded-t-xl"
      aria-label={`Phát ${title}`}
    >
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <span className="absolute inset-0 grid place-items-center">
        <span className="h-12 w-12 rounded-full bg-white/80 text-black grid place-items-center text-lg font-bold">
          ▶
        </span>
      </span>
      {duration && (
        <span className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-1.5 py-0.5 rounded">
          {duration}
        </span>
      )}
    </button>
  );
}
