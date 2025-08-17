// ===============================
// ✅ Responsive Footer cho AnhSexViet.info – POLISHED SEO + TRUST + BRAND
// ===============================
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-zinc-400 text-sm py-6 mt-12 border-t border-zinc-800">
      <div className="max-w-3xl mx-auto px-3 text-center space-y-3">
        {/* Info chính */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
          <span>
            © {new Date().getFullYear()}{" "}
            <span className="font-heading text-pink-400 font-bold">
              AnhSexViet.info
            </span>{" "}
            – Ảnh sex gái Việt, onlyfans, video sex ngắn 18+ tuyển chọn, cập nhật mỗi ngày.
          </span>
        </div>
        {/* Thêm dòng nguồn ảnh */}
        <span className="block italic text-zinc-500 text-xs mt-1">
          Ảnh sex được sưu tầm &amp; tuyển chọn từ internet, tạp chí, Telegram, cộng đồng...
        </span>
        <div>
          <span className="inline-flex items-center gap-1">
            🔞 Website chỉ dành cho người trên 18 tuổi. Truy cập tiếp nghĩa là bạn xác nhận đủ tuổi &amp; tự chịu trách nhiệm nội dung.
          </span>
        </div>
        {/* Link ngang */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 pt-2 text-xs">
          <Link href="/gioi-thieu" className="hover:text-pink-400 underline underline-offset-2">
            Giới thiệu
          </Link>
          <span className="hidden sm:inline">|</span>
          <Link href="/lien-he" className="hover:text-pink-400 underline underline-offset-2">
            Liên hệ
          </Link>
          <span className="hidden sm:inline">|</span>
          <a
            href="https://www.google.com/search?q=anhsexviet.info"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-400 underline underline-offset-2"
          >
            Tìm trên Google
          </a>
        </div>

        {/* CTA truyendam.net */}
        <div className="flex justify-center pt-3">
          <a
            href="https://truyendam.net"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-pink-600 hover:bg-pink-500 text-white font-heading font-semibold shadow transition text-sm"
          >
            👉 Đọc truyện sex cực phê tại <span className="underline font-bold">Truyendam.net</span>
          </a>
        </div>

        {/* Telegram */}
        <div className="pt-3 text-xs">
          🔗 Tham gia kênh Telegram:{" "}
          <a
            href="https://t.me/truyendamnet"
            className="font-semibold underline hover:text-pink-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            @truyendamnet
          </a>
        </div>
      </div>
    </footer>
  );
}
