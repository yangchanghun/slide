import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useSliderImagesQuery } from "./hooks/useSlider";

export default function SliderPage() {
  const { id } = useParams();
  const sliderId = Number(id);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const { data, isLoading, isError, error } = useSliderImagesQuery(sliderId);

  const images = data?.slides ?? [];

  const loopImages = useMemo(() => {
    if (images.length === 0) return [];
    return [...images, images[0]];
  }, [images]);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = window.setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
      setIsTransitioning(true);
    }, 7000);

    return () => window.clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentIndex(0);
    setIsTransitioning(true);
  }, [sliderId]);

  const handleTransitionEnd = () => {
    if (currentIndex === images.length) {
      setIsTransitioning(false);
      setCurrentIndex(0);
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
      const raf = requestAnimationFrame(() => {
        const raf2 = requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
        return () => cancelAnimationFrame(raf2);
      });

      return () => cancelAnimationFrame(raf);
    }
  }, [isTransitioning]);

  if (!id || Number.isNaN(sliderId)) {
    return (
      <div className="flex min-h-screen items-center justify-center text-lg">
        잘못된 페이지입니다.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-lg">
        이미지 불러오는 중...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        {error instanceof Error ? error.message : "이미지 조회 실패"}
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-500">
        등록된 이미지가 없습니다.
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <div
        className="relative aspect-[720/1280] w-full overflow-hidden bg-black shadow-2xl"
        style={{ maxWidth: "1000px", maxHeight: "1500px" }}
      >
        <div
          className="flex h-full w-full"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: isTransitioning
              ? "transform 700ms ease-in-out"
              : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {loopImages.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="relative h-full w-full flex-shrink-0"
            >
              <img
                src={`https://kioquiz.kioedu.co.kr${item.image}`}
                alt={item.title ?? `slide-${item.id}`}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          ))}
        </div>

        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {images.map((item, index) => (
            <button
              key={item.id}
              onClick={() => {
                setIsTransitioning(true);
                setCurrentIndex(index);
              }}
              className={`h-2.5 w-2.5 rounded-full transition ${
                currentIndex % images.length === index
                  ? "bg-white"
                  : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
