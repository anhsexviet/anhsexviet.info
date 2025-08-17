"use client";
import Link from "next/link";
import { slugify } from "@/lib/slugify";

// TagFilterChips: bộ lọc tag cho /anh-sex, tối ưu SEO & UX, hỗ trợ truy cập bàn phím
export default function TagFilterChips({
  tags,
  selectedTagSlug,
}: {
  tags: string[];
  selectedTagSlug: string;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-5">
      <Link
        href="/anh-sex"
        className={`px-3 py-1 rounded-full border text-xs font-heading font-semibold transition flex items-center gap-1
          ${!selectedTagSlug
            ? "bg-pink-600 border-pink-400 text-white shadow"
            : "bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-pink-500 hover:text-white"}
        `}
        style={{ minWidth: 60, justifyContent: "center" }}
        aria-current={!selectedTagSlug ? "page" : undefined}
        tabIndex={0}
        title="Xem tất cả album ảnh sex"
      >
        Tất cả
      </Link>
      {tags.map((label, idx) => {
        const slug = slugify(label);
        const isActive = selectedTagSlug === slug;
        return (
          <Link
            key={slug}
            href={`/anh-sex?tag=${encodeURIComponent(slug)}`}
            className={`px-3 py-1 rounded-full border text-xs font-heading font-semibold transition flex items-center gap-1
              ${isActive
                ? "bg-pink-600 border-pink-400 text-white shadow"
                : "bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-pink-500 hover:text-white"}
            `}
            style={{ minWidth: 60, justifyContent: "center" }}
            aria-current={isActive ? "page" : undefined}
            tabIndex={0}
            title={`Xem album chủ đề: ${label} – Ảnh sex Việt, album hot`}
          >
            {/* Icon hot cho 3 tag đầu */}
            {idx === 0 ? "🔥" : idx < 3 ? "👑" : null}
            {label}
          </Link>
        );
      })}
    </div>
  );
}
