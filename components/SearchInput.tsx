// ✅ components/SearchInput.tsx – Polish performance, best-practice cho web ảnh/video sex
"use client";

import { useState } from "react";

type Props = {
  placeholder?: string;
  onSearch?: (q: string) => void; // Optionally nhận hàm search bên ngoài
};

export default function SearchInput({ placeholder, onSearch }: Props) {
  const [query, setQuery] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;

    // Nếu truyền hàm search, gọi luôn (client-side filter)
    if (onSearch) return onSearch(q);

    // Nếu chưa làm filter, chỉ log (sau này sẽ redirect)
    // window.location.href = `/search?q=${encodeURIComponent(q)}`; // Uncomment nếu có trang search
    console.log("🔍 Tìm kiếm:", q);
  }

  return (
    <form
      onSubmit={handleSearch}
      className="w-full max-w-lg mx-auto flex items-center gap-2"
      role="search"
      aria-label="Tìm kiếm album hoặc video"
      autoComplete="off"
    >
      <input
        type="text"
        placeholder={placeholder || "Tìm kiếm album, video..."}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 bg-zinc-800 text-white px-4 py-2 rounded-xl border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-pink-500 transition text-base"
        aria-label="Ô tìm kiếm"
        enterKeyHint="search"
        autoCorrect="off"
        autoCapitalize="off"
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-xl bg-pink-600 text-white font-semibold hover:bg-pink-500 transition text-sm"
        aria-label="Tìm kiếm"
      >
        🔍
      </button>
    </form>
  );
}
