// ================================
// ✅ components/Header.tsx – Polish UI, brand AnhSexViet.info, SEO trust, mobile chuẩn
// ================================

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 w-full bg-black/90 backdrop-blur border-b border-zinc-800 shadow-sm">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-2 md:px-4 py-2">
        {/* Logo Brand */}
        <Link
          href="/"
          aria-label="Trang chủ AnhSexViet.info"
          className="font-heading text-xl md:text-2xl font-extrabold text-white tracking-tight hover:text-pink-400 transition select-none whitespace-nowrap"
          style={{ lineHeight: 1.1 }}
        >
          <span className="text-white">Anh</span>
          <span className="text-pink-500">SexViet</span>
          <span className="text-white text-base font-normal ml-1 hidden sm:inline">.info</span>
        </Link>
        {/* Menu bar – scroll-x mobile, gap lớn hơn desktop */}
        <nav className="flex items-center gap-1 sm:gap-3 md:gap-5 overflow-x-auto scrollbar-none min-w-0">
          <HeaderNavLink href="/anh-sex">Album Ảnh Sex</HeaderNavLink>
          <HeaderNavLink href="/video-sex">Video Sex Ngắn</HeaderNavLink>
          <HeaderNavLink
            href="https://truyendam.net"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-400 hover:text-white"
          >
            Truyện Sex Hay
          </HeaderNavLink>
        </nav>
      </div>
    </header>
  );
}

// Custom menu link – tối ưu UX, hover đẹp, không vỡ chữ mobile
function HeaderNavLink({
  href,
  children,
  className = "",
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      className={`relative font-semibold px-3 py-2 text-sm md:text-base text-zinc-200 hover:text-pink-400 transition
        before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-0 before:h-0.5 before:bg-pink-400
        hover:before:w-full before:transition-all before:duration-300 before:rounded
        whitespace-nowrap ${className}`}
      style={{ overflow: "hidden" }}
      {...props}
    >
      {children}
    </Link>
  );
}
