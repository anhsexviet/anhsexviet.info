// ===============================
// ✅ app/lien-he/page.tsx – Chuẩn SEO metadata + JSON-LD ContactPage cho AnhSexViet.info
// ===============================

export const generateMetadata = () => {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://anhsexviet.info";
  return {
    title: "Liên Hệ | AnhSexViet.info – Góp ý, hợp tác, báo cáo nội dung",
    description:
      "Liên hệ AnhSexViet.info qua email hoặc Telegram để góp ý, báo cáo nội dung vi phạm, hợp tác phát triển cộng đồng 18+ an toàn, kín đáo.",
    alternates: { canonical: "/lien-he" },
    openGraph: {
      title: "Liên Hệ | AnhSexViet.info",
      description:
        "Liên hệ AnhSexViet.info qua email hoặc Telegram – góp ý, báo cáo vi phạm, hợp tác. Chúng tôi trân trọng mọi phản hồi.",
      url: base + "/lien-he",
      images: [`${base}/og-default.jpg`],
      type: "article",
    },
    robots: { index: true, follow: true },
  };
};

export default function LienHePage() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://anhsexviet.info";
  return (
    <div className="max-w-xl mx-auto py-10 px-2 sm:px-0">
      {/* JSON-LD ContactPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Liên Hệ AnhSexViet.info",
            description:
              "Liên hệ AnhSexViet.info để góp ý, báo cáo nội dung vi phạm, hợp tác phát triển cộng đồng 18+ an toàn, kín đáo.",
            url: base + "/lien-he",
            email: "anhsexviet.info@gmail.com",
            sameAs: ["https://t.me/truyendamnet"],
          }),
        }}
      />
      <h1 className="font-heading text-3xl font-bold text-pink-400 mb-5">
        Liên Hệ
      </h1>
      <p className="mb-2">
        Bạn có góp ý, muốn báo cáo nội dung vi phạm, hoặc đề xuất hợp tác với <b className="text-white">AnhSexViet.info</b>?
      </p>
      <p className="mb-4">
        Hãy gửi email về địa chỉ sau (ẩn danh được chấp nhận):
      </p>
      <div className="mb-5">
        <a
          href="mailto:anhsexviet.info@gmail.com"
          className="font-mono text-pink-400 text-lg underline hover:text-pink-300 break-all"
        >
          anhsexviet.info@gmail.com
        </a>
      </div>
      <blockquote className="border-l-4 border-pink-500 pl-4 text-zinc-300 italic mb-5">
        Mọi phản hồi đều được đọc và xử lý cẩn thận. Chúng tôi trân trọng sự đóng góp của bạn để website ngày càng hoàn thiện, an toàn, thân thiện hơn với cộng đồng.
      </blockquote>
      <div className="mt-6">
        <span className="text-zinc-400 text-sm">Hoặc tham gia Telegram:</span>
        <a
          href="https://t.me/truyendamnet"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 underline text-pink-400 font-mono hover:text-pink-300"
        >
          @truyendamnet
        </a>
      </div>
    </div>
  );
}
