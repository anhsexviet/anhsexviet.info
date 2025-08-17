// ===============================
// 📁 components/RelatedAlbums.tsx – Polish performance, responsive grid, chuẩn SEO
// ===============================

import Link from "next/link";

type RelatedAlbum = {
  slug: string;
  title: string;
  cover: string;
};
type Props = {
  albums: RelatedAlbum[];
};

export default function RelatedAlbums({ albums }: Props) {
  if (!albums?.length) return null;

  return (
    <section className="mt-12 mb-8 flex flex-col items-center">
      {/* Tiêu đề nổi bật */}
      <h2 className="font-heading text-lg md:text-xl font-bold text-white mb-4 flex items-center gap-2">
        <span aria-hidden>📸</span> Album liên quan
      </h2>

      {/* Grid album liên quan */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full max-w-2xl">
        {albums.slice(0, 4).map((a, idx) => (
          <Link
            key={a.slug}
            href={`/anh-sex/${a.slug}`}
            className="block rounded-xl overflow-hidden shadow bg-zinc-900 hover:shadow-pink-400/40 transition-transform hover:scale-[1.045]"
            tabIndex={0}
            style={{ minWidth: "0" }}
            aria-label={`Xem album liên quan: ${a.title}`}
            prefetch={idx === 0} // Prefetch album nổi bật đầu tiên
          >
            <img
              src={a.cover}
              alt={`${a.title} – Album liên quan AnhSexViet.info`}
              className="w-full h-28 sm:h-32 object-cover object-center transition group-hover:brightness-105"
              loading="lazy"
              draggable={false}
              width={320}
              height={180}
            />
            <div className="px-2 py-1 text-xs text-white font-semibold truncate">{a.title}</div>
          </Link>
        ))}
      </div>

      {/* CTA truyện sex nóng */}
      <div className="flex flex-col items-center mt-8">
        <a
          href="https://truyendam.net"
          className="inline-block px-5 py-2 rounded-full bg-pink-600 hover:bg-pink-500 text-white font-heading font-bold shadow-lg transition text-base"
          target="_blank"
          rel="noopener noreferrer"
        >
          👉 Đọc truyện sex cực nóng tại <span className="underline">Truyendam.net</span>
        </a>
        <div className="text-xs text-zinc-400 mt-1">
          Truyện 18+ full không giới hạn, cập nhật mỗi đêm!
        </div>
      </div>
    </section>
  );
}
