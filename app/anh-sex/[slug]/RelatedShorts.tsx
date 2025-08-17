// ===============================
// 📁 File: app/anh-sex/[slug]/RelatedShorts.tsx
// ✅ POLISH UI – Video liên quan cực mượt, chia block highlight + "xem thêm"
// ===============================
"use client";

import { useState } from "react";
import { VideoCardLocal } from "@/components/VideoCardLocal";
import { VideoCardEmbed } from "@/components/VideoCardEmbed";
import VideoThumbnailButton from "@/components/VideoThumbnailButton";

export type VideoItem = {
  title: string;
  thumbnail: string;
  duration?: string;
  file?: string;
  embedUrl?: string;
};

export default function RelatedShorts({ items }: { items: VideoItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  if (!items?.length) return null;

  // Số video nổi bật hiện trước
  const HIGHLIGHT = 3;
  const highlightItems = items.slice(0, HIGHLIGHT);
  const moreItems = items.slice(HIGHLIGHT);

  return (
    <section className="mt-10">
      <h2 className="text-white font-semibold text-lg mb-4">
        🎥 Video sex ngắn liên quan
      </h2>

      {/* Grid 2 cột trên desktop, 1 cột mobile – chuẩn UX */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {highlightItems.map((v, i) => {
          const idx = i;
          const isOpen = open === idx;
          return (
            <div
              key={idx}
              className="w-full overflow-hidden rounded-xl bg-zinc-900/70 shadow transition hover:shadow-pink-500/30"
            >
              {isOpen ? (
                v.file ? (
                  <VideoCardLocal
                    title={v.title}
                    file={v.file}
                    thumbnail={v.thumbnail}
                  />
                ) : v.embedUrl ? (
                  <VideoCardEmbed
                    title={v.title}
                    embedUrl={v.embedUrl}
                  />
                ) : null
              ) : (
                <VideoThumbnailButton
                  thumbnail={v.thumbnail}
                  title={v.title}
                  duration={v.duration}
                  onClick={() => setOpen(idx)}
                />
              )}
              <div className="p-2 text-sm text-zinc-100 text-center">{v.title}</div>
            </div>
          );
        })}
      </div>

      {/* Nếu có nhiều hơn 3 video – ẩn dưới “Xem thêm” */}
      {moreItems.length > 0 && (
        <details className="mt-5">
          <summary className="cursor-pointer text-pink-400 text-center font-semibold mb-2 select-none">
            Xem thêm {moreItems.length} video khác
          </summary>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
            {moreItems.map((v, i) => {
              const idx = i + HIGHLIGHT;
              const isOpen = open === idx;
              return (
                <div
                  key={idx}
                  className="w-full overflow-hidden rounded-xl bg-zinc-900/70 shadow transition hover:shadow-pink-500/30"
                >
                  {isOpen ? (
                    v.file ? (
                      <VideoCardLocal
                        title={v.title}
                        file={v.file}
                        thumbnail={v.thumbnail}
                      />
                    ) : v.embedUrl ? (
                      <VideoCardEmbed
                        title={v.title}
                        embedUrl={v.embedUrl}
                      />
                    ) : null
                  ) : (
                    <VideoThumbnailButton
                      thumbnail={v.thumbnail}
                      title={v.title}
                      duration={v.duration}
                      onClick={() => setOpen(idx)}
                    />
                  )}
                  <div className="p-2 text-sm text-zinc-100 text-center">{v.title}</div>
                </div>
              );
            })}
          </div>
        </details>
      )}
    </section>
  );
}
