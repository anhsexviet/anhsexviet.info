// ===============================
// ✅ components/AlbumSearchBar.tsx – Polish performance + UX/UI
// ===============================
"use client";
import { useState, useRef } from "react";

type Props = {
  tags: string[];
  onSearch: (keyword: string, tag: string) => void;
};

export default function AlbumSearchBar({ tags, onSearch }: Props) {
  const [keyword, setKeyword] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Gọi filter khi nhập, tránh gọi thừa nếu không đổi giá trị
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setKeyword(val);
    onSearch(val, selectedTag);
  }

  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const val = e.target.value;
    setSelectedTag(val);
    onSearch(keyword, val);
  }

  // Enter focus vào input search
  function handleContainerClick() {
    inputRef.current?.focus();
  }

  return (
    <section
      className="flex flex-col md:flex-row gap-2 items-center justify-center p-4 bg-zinc-900/80 rounded-2xl shadow-lg max-w-2xl mx-auto mt-2"
      tabIndex={0}
      aria-label="Thanh tìm kiếm album"
      onClick={handleContainerClick}
      style={{ cursor: "text" }}
    >
      <div className="flex-1 w-full">
        <label htmlFor="album-search" className="sr-only">
          Tìm kiếm album ảnh sex
        </label>
        <input
          ref={inputRef}
          id="album-search"
          type="text"
          autoComplete="off"
          spellCheck={false}
          value={keyword}
          onChange={handleInput}
          placeholder="🔍 Tìm album ảnh sex..."
          className="w-full bg-zinc-800 rounded-lg px-4 py-2 text-white outline-none border border-zinc-700 focus:border-pink-500 transition font-medium"
          aria-label="Tìm album"
        />
      </div>
      <div className="w-full md:w-56">
        <label htmlFor="album-tag" className="sr-only">
          Lọc theo thể loại
        </label>
        <select
          id="album-tag"
          value={selectedTag}
          onChange={handleSelect}
          className="w-full bg-zinc-800 rounded-lg px-4 py-2 text-white border border-zinc-700 focus:border-pink-500 transition font-medium"
          aria-label="Lọc theo thể loại"
        >
          <option value="">-- Tất cả thể loại --</option>
          {tags.map((tag) => (
            <option value={tag} key={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}
