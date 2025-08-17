// ===========================
// ✅ middleware.ts – Redirect filter tag query → route /tag/[slug], chuẩn SEO, tối ưu Edge Runtime
// ===========================
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Slugify cơ bản cho Edge Runtime (an toàn, không lỗi UTF-8)
const s = (str: string) =>
  str
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d").replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

// Main middleware
export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const tag = url.searchParams.get("tag");

  // 1. Redirect /?tag=... => /tag/...
  if (tag) {
    const slug = s(tag);
    url.searchParams.delete("tag");
    url.pathname = `/tag/${slug}`;
    return NextResponse.redirect(url, 308);
  }

  // 2. Redirect ?page=1 về trang gốc
  if (url.searchParams.get("page") === "1") {
    url.searchParams.delete("page");
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

// Áp dụng cho homepage + /anh-sex + /tag
export const config = {
  matcher: [
    "/",
    "/anh-sex/:path*",
    "/tag",
    "/tag/:path*",
  ],
};
