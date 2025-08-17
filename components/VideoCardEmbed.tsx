// ===============================
// ✅ File mới: components/VideoCardEmbed.tsx
// ===============================

"use client";

interface EmbedProps {
  title: string;
  embedUrl: string;
}

export function VideoCardEmbed({ title, embedUrl }: EmbedProps) {
  return (
    <div className="relative w-full aspect-[9/16]">
      <iframe
        src={embedUrl}
        title={title}
        className="absolute inset-0 h-full w-full rounded-t-xl"
        loading="lazy"
        referrerPolicy="no-referrer"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}