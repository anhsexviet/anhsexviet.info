"use client";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import VideoPlayer from "@/components/VideoPlayer";

type VideoItem = {
  slug: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
};

type Props = {
  images: string[];
  videos?: VideoItem[];
  albumTitle?: string; // <-- Optional, for better alt
};

export default function GalleryClient({ images, videos, albumTitle }: Props) {
  const [index, setIndex] = useState(-1);

  const largeCount = Math.min(3, images.length);

  return (
    <>
      {/* Gallery ảnh lớn (top 3 ảnh đầu) */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6 w-full max-w-3xl mx-auto">
        {images.slice(0, largeCount).map((src, i) => (
          <div
            key={i}
            className="flex-1 rounded-2xl overflow-hidden shadow-lg cursor-zoom-in transition-transform duration-300 hover:scale-105"
            style={{ minWidth: 0 }}
            onClick={() => setIndex(i)}
            tabIndex={0}
            aria-label={`Xem ảnh ${i + 1} lớn`}
          >
            <img
              src={src}
              alt={
                albumTitle
                  ? `${albumTitle} - Ảnh ${i + 1}`
                  : `Ảnh sex ${i + 1}`
              }
              className="w-full h-52 sm:h-56 md:h-60 object-cover object-center"
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Gallery grid nhỏ các ảnh còn lại */}
      {images.length > largeCount && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10 w-full max-w-3xl mx-auto">
          {images.slice(largeCount).map((src, i) => (
            <div
              key={i + largeCount}
              className="rounded-xl overflow-hidden shadow cursor-zoom-in transition-transform duration-200 hover:scale-104"
              onClick={() => setIndex(i + largeCount)}
              style={{ minWidth: 0 }}
              tabIndex={0}
              aria-label={`Xem ảnh ${i + 1 + largeCount} lớn`}
            >
              <img
                src={src}
                alt={
                  albumTitle
                    ? `${albumTitle} - Ảnh ${i + 1 + largeCount}`
                    : `Ảnh sex ${i + 1 + largeCount}`
                }
                className="w-full h-40 sm:h-44 object-cover object-center"
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            </div>
          ))}
        </div>
      )}

      {/* Lightbox show toàn bộ ảnh */}
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={images.map((src) => ({ src }))}
        styles={{ container: { backgroundColor: "rgba(20,20,20,0.97)" } }}
      />

      {/* Video sex ngắn liên quan */}
      {videos && videos.length > 0 && (
        <div className="mt-10 w-full max-w-3xl mx-auto">
          <h3 className="text-white font-semibold text-lg mb-4">
            🎥 Video sex ngắn liên quan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.slice(0, 3).map((video) => (
              <div
                key={video.slug}
                className="w-full bg-zinc-800 rounded-xl overflow-hidden shadow-md"
              >
                <VideoPlayer
                  videoUrl={video.videoUrl}
                  thumbnail={video.thumbnail}
                  title={video.title}
                />
                <div className="p-2 text-sm text-white text-center">
                  {video.title}
                </div>
              </div>
            ))}
          </div>
          {videos.length > 3 && (
            <div className="text-center mt-4">
              <span className="text-sm text-pink-400">
                ...Và {videos.length - 3} video nữa
              </span>
            </div>
          )}
        </div>
      )}
    </>
  );
}
