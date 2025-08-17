// lib/slugify.ts
export function slugify(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/[^a-zA-Z0-9 ]/g, "") // Remove non-alphanumeric except space
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase();
}
