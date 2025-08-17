// 📁 lib/albums.ts
import fs from "fs";
import path from "path";

// ===== Type định nghĩa =====
export type VideoItem = {
  slug: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
   duration?: string; // <-- thêm dòng này nếu chưa có!
};

export type ShortItem = {
  title: string;
  thumbnail?: string;
  duration?: string;
  file?: string;
  embedUrl?: string;
};

export type Album = {
  slug: string;
  title: string;
  cover: string;
  images: string[];
  tags: string[];
  views: number;
  createdAt: string;        // YYYY-MM-DD
  shorts?: ShortItem[];
  videos?: VideoItem[];
};

// ===== Đọc album từ content/albums =====
const albumsDirectory = path.join(process.cwd(), "content/albums");

// Trả về list Album đã sort mới nhất (chỉ dùng ở server!)
export function getAllAlbums(): Album[] {
  const slugs = fs.readdirSync(albumsDirectory);
  const albums = slugs
    .filter((slug) => fs.existsSync(path.join(albumsDirectory, slug, "index.json")))
    .map((slug) => {
      const fullPath = path.join(albumsDirectory, slug, "index.json");
      const fileContents = fs.readFileSync(fullPath, "utf8");
      return JSON.parse(fileContents) as Album;
    });
  return albums.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

// Đọc 1 album theo slug (chỉ dùng ở server!)
export function getAlbumBySlug(slug: string): Album | null {
  const fullPath = path.join(albumsDirectory, slug, "index.json");
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  return JSON.parse(fileContents) as Album;
}
