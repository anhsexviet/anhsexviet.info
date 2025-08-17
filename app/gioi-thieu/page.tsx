// ===============================
// 📁 app/gioi-thieu/page.tsx – Chuẩn SEO, metadata & JSON-LD cho AnhSexViet.info
// ===============================

import Link from "next/link";

export const generateMetadata = () => {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://anhsexviet.info";
  return {
    title: "Giới Thiệu | AnhSexViet.info – Album Ảnh Sex Gái Việt, Onlyfans, Tự Sướng",
    description: "Giới thiệu về AnhSexViet.info – nơi tổng hợp, chia sẻ album ảnh sex gái Việt, onlyfans, tự sướng, video sex ngắn chất lượng cao, an toàn, ẩn danh.",
    alternates: { canonical: "/gioi-thieu" },
    openGraph: {
      title: "Giới Thiệu | AnhSexViet.info",
      description: "Nơi tổng hợp ảnh sex gái xinh, onlyfans, tự sướng, video sex ngắn, 18+ kín đáo, miễn phí.",
      url: base + "/gioi-thieu",
      images: [`${base}/og-default.jpg`],
      type: "article",
    },
    robots: { index: true, follow: true },
  };
};

export default function GioiThieuPage() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://anhsexviet.info";
  return (
    <div className="max-w-xl mx-auto py-10 px-2 sm:px-0">
      {/* JSON-LD AboutPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "AnhSexViet.info",
            description: "Website chia sẻ album ảnh sex gái Việt, onlyfans, tự sướng, video sex ngắn, nội dung 18+ kín đáo, miễn phí.",
            url: base + "/gioi-thieu",
            email: "anhsexviet.info@gmail.com",
            sameAs: ["https://t.me/truyendamnet"],
          }),
        }}
      />
      <h1 className="font-heading text-3xl font-bold text-pink-400 mb-5">
        Giới Thiệu AnhSexViet.info
      </h1>
      <p className="mb-2">
        <b className="text-white">AnhSexViet.info</b> là website tổng hợp, chia sẻ và cập nhật nhanh nhất các bộ <b>ảnh sex gái xinh Việt, Nhật, Hàn, Onlyfans leak, bộ ảnh tự sướng, ảnh nóng kín đáo và video sex ngắn</b> chất lượng cao dành cho người trưởng thành.
      </p>
      <p className="mb-2">
        Website hoạt động phi lợi nhuận, không lưu trữ nội dung độc quyền, không yêu cầu đăng nhập – <b>mọi truy cập đều ẩn danh và miễn phí</b>. Tất cả nội dung đều được kiểm duyệt, ưu tiên sự an toàn và quyền riêng tư cho người xem.
      </p>
      <blockquote className="border-l-4 border-pink-500 pl-4 text-zinc-300 italic my-5">
        “Sứ mệnh của chúng tôi là mang đến cộng đồng người trưởng thành Việt Nam một không gian giải trí an toàn, lành mạnh và kín đáo, đồng thời xây dựng văn hóa thưởng thức nội dung 18+ văn minh.”
      </blockquote>
      <p className="mb-2">
        <b>Lưu ý:</b> Website chỉ dành riêng cho người trên <b>18 tuổi</b>. Khi truy cập liên tục, bạn đã xác nhận đủ tuổi, tự chịu trách nhiệm về mọi hành vi sử dụng nội dung trên website.
      </p>
      <div className="mt-4 text-zinc-400 text-sm">
        Mọi góp ý hoặc liên hệ hợp tác xin gửi về email:{" "}
        <a
          href="mailto:anhsexviet.info@gmail.com"
          className="underline text-pink-400 hover:text-pink-300"
        >
          anhsexviet.info@gmail.com
        </a>
      </div>
      <div className="mt-2 text-zinc-400 text-sm">
        Hoặc kênh Telegram:{" "}
        <a
          href="https://t.me/truyendamnet"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-pink-400 hover:text-pink-300"
        >
          @truyendamnet
        </a>
      </div>
    </div>
  );
}
