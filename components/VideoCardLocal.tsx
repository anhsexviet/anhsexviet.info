// ===============================
// ✅ File mới: components/VideoCardLocal.tsx
// ===============================

"use client";

interface LocalProps {
  title: string;
  file: string;
  thumbnail: string;
}

export function VideoCardLocal({ title, file, thumbnail }: LocalProps) {
  return (
    <video
      src={file}
      poster={thumbnail}
      className="w-full h-auto aspect-video"
      controls
      playsInline
      preload="metadata"
      autoPlay
    />
  );
}