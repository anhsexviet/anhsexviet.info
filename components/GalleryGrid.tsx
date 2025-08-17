// ===============================
// ✅ components/GalleryGrid.tsx – Polish performance, best UX cho grid album, badge "MỚI/HOT", focus, responsive
// ===============================
import Link from "next/link";
import { slugify } from "@/lib/slugify";

type Album = {
  slug: string;
  title: string;
  cover: string;
  views: number;
  createdAt: string;
  tags?: string[];
};

export default function GalleryGrid({ albums }: { albums: Album[] }) {
  // Badge "MỚI": 3 ngày, "HOT": > 5.000 views
  const THREE_DAYS = 3 * 24 * 60 * 60 * 1000;
  const now = Date.now();
  const isNew = (createdAt: string) =>
    now - new Date(createdAt).getTime() < THREE_DAYS;
  const isHot = (views: number) => Number(views) > 5000;

  if (!albums?.length) {
    return (
      <div className="text-zinc-400 text-center py-10">
        Hiện chưa có album nào.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 p-2 sm:p-4">
      {albums.map((album) => (
        <article
          key={album.slug}
          className="group overflow-hidden rounded-2xl shadow-lg hover:shadow-pink-400/40 bg-zinc-900 border-2 border-transparent hover:border-pink-500/80 transition-all duration-300"
        >
          {/* Ảnh cover + badge + title */}
          <Link
            href={`/anh-sex/${album.slug}`}
            className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
            tabIndex={0}
            aria-label={`Xem album: ${album.title}`}
            prefetch={false}
          >
            <div className="relative w-full h-48 sm:h-56 md:h-60 overflow-hidden">
              <img
                src={album.cover}
                alt={album.title}
                className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110 group-hover:brightness-110"
                loading="lazy"
                decoding="async"
                draggable={false}
              />
              {/* Badge NEW/HOT/18+ */}
              <div className="absolute top-2 left-2 flex gap-1 z-10">
                <span className="bg-black/80 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur font-bold select-none pointer-events-none">
                  18+
                </span>
                {isHot(album.views) && (
                  <span className="bg-pink-600 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur font-bold select-none pointer-events-none">
                    HOT
                  </span>
                )}
                {isNew(album.createdAt) && (
                  <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur font-bold select-none pointer-events-none">
                    MỚI
                  </span>
                )}
              </div>
            </div>
            <h3 className="px-3 pt-3 font-heading text-white font-semibold text-base leading-snug line-clamp-2 group-hover:text-pink-400 transition">
              {album.title}
            </h3>
          </Link>
          {/* Tag */}
          <div className="px-3 pb-1 flex flex-wrap gap-1 mt-1">
            {(album.tags || []).slice(0, 4).map((tag) => (
              <Link
                key={tag}
                href={`/tag/${slugify(tag)}`}
                className="inline-block bg-zinc-800 text-pink-400 hover:bg-pink-400 hover:text-white px-2 py-0.5 rounded-full text-[10px] font-semibold transition"
                tabIndex={0}
                prefetch={false}
                aria-label={`Xem album tag "${tag}"`}
              >
                {tag}
              </Link>
            ))}
          </div>
          {/* Footer info */}
          <div className="px-3 pb-3 text-[11px] text-gray-400">
            👁️ {Number(album.views).toLocaleString("en-US")} • 🗓 {album.createdAt}
          </div>
        </article>
      ))}
    </div>
  );
}
