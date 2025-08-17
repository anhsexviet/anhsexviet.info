// 📁 components/VideoPlayer.tsx

"use client";

type Props = {
  videoUrl: string;
  thumbnail: string;
  title: string;
};

export default function VideoPlayer({ videoUrl, thumbnail, title }: Props) {
  return (
    <video
      controls
      poster={thumbnail}
      preload="metadata"
      className="w-full aspect-video rounded-xl shadow-md object-cover"
    >
      <source src={videoUrl} type="video/mp4" />
      Trình duyệt của bạn không hỗ trợ video.
    </video>
  );
}
