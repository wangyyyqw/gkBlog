import Image from "next/image";
import { useEffect, useState } from "react";
import Zoom from "react-medium-image-zoom";

interface Essay {
  id: string;
  username: string;
  time: string;
  content: string;
  avatar_url: string;
  images?: string[];
}

interface ImageCarouselProps {
  images: string | string[];
}

function ImageCarousel({ images }: ImageCarouselProps) {
  const imageArray = Array.isArray(images) ? images : [images];
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? imageArray.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === imageArray.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div
        className="relative w-full overflow-hidden rounded-lg"
        style={{ height: "300px" }}
      >
        {imageArray.map((img, index) => (
          <div
            key={`image-${img}`}
            className={`absolute inset-0 transition-opacity duration-300 ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"}`}
            style={{ height: "300px" }}
          >
            <Zoom>
              <div
                className="w-full h-full relative"
                style={{ height: "300px" }}
              >
                <Image
                  src={img}
                  alt={`图片 ${index + 1}`}
                  fill
                  objectFit="cover"
                  className="w-full h-full object-cover rounded-lg"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </Zoom>
          </div>
        ))}

        {/* 左箭头 */}
        <button
          type="button"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center transition-opacity duration-300"
          onClick={goToPrevious}
          aria-label="上一张图片"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* 右箭头 */}
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center transition-opacity duration-300"
          onClick={goToNext}
          aria-label="下一张图片"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* 指示器 */}
      <div className="flex justify-center mt-3 space-x-2">
        {imageArray.map((_, index) => (
          <button
            key={`indicator-${imageArray[index]}`}
            type="button"
            className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-accent-500" : "bg-gray-300"}`}
            onClick={() => goToSlide(index)}
            aria-label={`跳转到图片 ${index + 1}`}
          />
        ))}
      </div>

      {/* 当前图片编号 */}
      <div className="text-center text-sm text-gray-500 mt-2">
        {currentIndex + 1} / {imageArray.length}
      </div>
    </div>
  );
}

function EssayContents() {
  const [essays, setEssays] = useState<Essay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/assets/data/essays.json");
        if (!response.ok) throw new Error("网络错误");
        const data: Essay[] = await response.json();

        const sortedEssays = [...data].sort(
          (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
        );

        setEssays(sortedEssays);
      } catch (err) {
        setError(err instanceof Error ? err.message : "未知错误");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>加载中...</p>;
  if (error) return <p>出错了: {error}</p>;

  return (
    <div className="content-wrapper p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-3">
        {essays.map((essay) => (
          <div
            key={essay.id}
            className="flex flex-col overflow-hidden rounded-xl bg-gray-100 transition-transform hover:-translate-y-1 dark:bg-gray-800"
          >
            <div className="flex items-center gap-4 py-3 px-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 bg-gray-200 dark:border-gray-900">
                <Image
                  src={essay.avatar_url}
                  alt={`${essay.username} 的头像`}
                  width={50}
                  height={50}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="font-bold text-gray-800 dark:text-white">
                  {essay.username}
                </h2>
                <p className="text-gray-500 text-sm dark:text-gray-400">
                  {essay.time}
                </p>
              </div>
            </div>
            <p className="text-gray-600 py-1 px-6 leading-relaxed dark:text-gray-400">
              {essay.content.split("\n").map((line, index) => {
                const key = `line-${essay.id}-${index}`;
                return (
                  <span key={key}>
                    {line}
                    {index < essay.content.split("\n").length - 1 && <br />}
                  </span>
                );
              })}
            </p>
            {essay.images && (
              <div className="py-1 px-6">
                <ImageCarousel images={essay.images} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EssayContents;
