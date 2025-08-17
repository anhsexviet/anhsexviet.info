// ===============================
// ✅ components/Pagination.tsx – Polish performance, UI/UX chuẩn cho mọi grid Next.js
// ===============================
import Link from "next/link";

type Props = {
  current: number;
  total: number;
  // (Tuỳ grid: thêm optional basePath nếu cần route ngoài homepage)
  basePath?: string;
};

export default function Pagination({ current, total, basePath = "/" }: Props) {
  if (total <= 1) return null;

  let pages: number[] = [];
  let start = Math.max(1, current - 2);
  let end = Math.min(total, current + 2);

  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <nav className="flex items-center justify-center gap-1 mt-6 select-none">
      <PageLink page={current - 1} basePath={basePath} disabled={current === 1} ariaLabel="Trang trước">
        Prev
      </PageLink>
      {start > 1 && (
        <>
          <PageLink page={1} basePath={basePath}>
            1
          </PageLink>
          {start > 2 && <span className="px-1 text-zinc-500 select-none">…</span>}
        </>
      )}
      {pages.map((p) => (
        <PageLink key={p} page={p} active={p === current} basePath={basePath}>
          {p}
        </PageLink>
      ))}
      {end < total && (
        <>
          {end < total - 1 && <span className="px-1 text-zinc-500 select-none">…</span>}
          <PageLink page={total} basePath={basePath}>
            {total}
          </PageLink>
        </>
      )}
      <PageLink page={current + 1} basePath={basePath} disabled={current === total} ariaLabel="Trang tiếp theo">
        Next
      </PageLink>
    </nav>
  );
}

function PageLink({
  page,
  children,
  disabled,
  active,
  basePath = "/",
  ariaLabel,
}: {
  page: number;
  children: React.ReactNode;
  disabled?: boolean;
  active?: boolean;
  basePath?: string;
  ariaLabel?: string;
}) {
  if (disabled)
    return (
      <span
        className="px-2 py-1 rounded font-heading text-sm text-zinc-400 opacity-40 cursor-not-allowed"
        aria-disabled="true"
      >
        {children}
      </span>
    );
  if (active)
    return (
      <span
        className="px-2 py-1 rounded font-heading text-sm bg-pink-500 text-white shadow"
        aria-current="page"
      >
        {children}
      </span>
    );
  // Homepage luôn là "/", các page khác thì query
  const href = page === 1 ? basePath : `${basePath}?page=${page}`;
  return (
    <Link
      href={href}
      scroll={false}
      className="px-2 py-1 rounded font-heading text-sm text-zinc-400 hover:text-pink-400 transition"
      tabIndex={0}
      aria-label={ariaLabel || `Trang ${page}`}
      prefetch={false}
    >
      {children}
    </Link>
  );
}
