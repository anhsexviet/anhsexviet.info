// ===============================
// ✅ components/AlbumCard.tsx – Tối ưu performance, prop rõ ràng, ảnh cover chuẩn SEO/UI/CLS
// ===============================

import Link from "next/link";
import { slugify } from "@/lib/slugify";

type AlbumCardProps = {
  slug: string;
  title: string;
  cover: string;
  views: number;
  createdAt: string;
  tags?: string[];
  loading?: "eager" | "lazy";
};

export default function AlbumCard({
  slug,
  title,
  cover,
  views,
  createdAt,
  tags = [],
  loading = "lazy", // Cho phép truyền hoặc mặc định lazy
}: AlbumCardProps) {
  return (
    <article className="group rounded-xl overflow-hidden bg-zinc-900 shadow-md hover:shadow-lg border-2 border-transparent hover:border-pink-500/60 transition">
      {/* Khu vực click vào album: chỉ ảnh + tiêu đề */}
      <Link href={`/anh-sex/${slug}`} className="block" tabIndex={0}>
        <div className="relative w-full h-48 sm:h-56 md:h-60 overflow-hidden">
          <img
            src={cover}
            alt={`${title} – Album ảnh sex gái Việt cực phẩm tại AnhSexViet.info`}
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            loading={loading}
            decoding="async"
            width={400}
            height={240}
            draggable={false}
            fetchPriority={loading === "eager" ? "high" : "auto"}
          />
          <span className="absolute top-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded select-none pointer-events-none">
            18+
          </span>
        </div>
        <h2 className="p-3 text-white font-semibold text-sm leading-snug line-clamp-2 group-hover:text-pink-400">
          {title}
        </h2>
      </Link>

      {/* Hàng tag (link riêng, KHÔNG lồng trong link card) */}
      <div className="px-3 pb-2 flex flex-wrap gap-1">
        {(tags || []).slice(0, 4).map((tag) => (
          <Link
            key={tag}
            href={`/?tag=${encodeURIComponent(slugify(tag))}`}
            className="inline-block bg-zinc-800 text-pink-400 hover:bg-pink-400 hover:text-white px-2 py-0.5 rounded-full text-[10px] font-semibold transition"
            tabIndex={0}
          >
            {tag}
          </Link>
        ))}
      </div>

      {/* Footer info */}
      <div className="px-3 pb-3 text-[11px] text-gray-400 flex items-center gap-2">
        <span>👁️ {Number(views).toLocaleString("en-US")}</span>
        <span>•</span>
        <span>🗓 {createdAt}</span>
      </div>
    </article>
  );
}
