// ===============================
// ✅ components/AlbumsExplorer.tsx – Performance polish, best UX cho grid album homepage
// ===============================
"use client";
import Link from "next/link";
import { slugify } from "@/lib/slugify";
import type { Album } from "@/lib/albums";
import GalleryGrid from "@/components/GalleryGrid";

type Props = {
  albums: Album[];
  topTags?: string[];
  limit?: number; // Có thể truyền limit album (default 12 cho homepage)
};

export default function AlbumsExplorer({ albums, topTags, limit = 12 }: Props) {
  const showAlbums = limit ? albums.slice(0, limit) : albums;

  return (
    <section className="w-full max-w-5xl mx-auto px-2 sm:px-4">
      {/* Tag filter – top tags (nếu có) */}
      {topTags && topTags.length > 0 && (
        <nav
          className="flex flex-wrap justify-center gap-2 mb-4"
          aria-label="Lọc theo tag"
        >
          <Link
            href="/"
            className="px-3 py-1 rounded-full bg-zinc-700 text-white text-xs font-heading font-semibold border border-zinc-700 hover:bg-pink-400 transition"
            scroll={false}
          >
            Tất cả
          </Link>
          {topTags.map((tag) => (
            <Link
              key={tag}
              href={`/?tag=${encodeURIComponent(slugify(tag))}`}
              className="px-3 py-1 rounded-full bg-zinc-800 text-white text-xs font-heading font-semibold border border-zinc-700 hover:bg-pink-500 hover:text-white transition"
              scroll={false}
            >
              {tag}
            </Link>
          ))}
        </nav>
      )}

      {/* Album grid */}
      <div className="space-y-4 mt-6">
        <h2 className="text-xl font-semibold text-white">
          🖼️ Album Ảnh Sex Mới Nhất
        </h2>
        {showAlbums.length === 0 ? (
          <div className="text-zinc-400">
            Không tìm thấy album nào khớp kết quả.
          </div>
        ) : (
          <GalleryGrid albums={showAlbums} />
        )}
      </div>
    </section>
  );
}
