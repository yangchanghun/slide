import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { deleteSlide, getSlidesByName } from "./services/slide";
import type { Slide } from "./types/slides";

const getImageUrl = (imagePath: string) => {
  if (imagePath.startsWith("http")) return imagePath;

  // const base = import.meta.env.VITE_BACKEND_ORIGIN || "http://127.0.0.1:8000";
  const base = "https://kioquiz.kioedu.co.kr";
  return `${base}${imagePath}`;
};

export default function SlideGroupPage() {
  const { id } = useParams();
  const [slides, setSlides] = useState<Slide[]>([]);
  const [slideName, setSlideName] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchSlides = async () => {
    if (!id) return;

    try {
      setLoading(true);

      const detail = await getSlidesByName(String(id));
      setSlideName(detail.slide_name);

      const groupRes = await getSlidesByName(detail.slide_name);
      setSlides(groupRes.slides);
    } catch (error) {
      console.error(error);
      alert("슬라이드 조회 실패");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, [id]);

  const handleDelete = async (slideId: number) => {
    const ok = window.confirm("정말 삭제할까요?");
    if (!ok) return;

    try {
      await deleteSlide(slideId);
      alert("삭제 완료");
      fetchSlides();
    } catch (error) {
      console.error(error);
      alert("삭제 실패");
    }
  };

  if (loading) {
    return <div style={{ padding: 20 }}>불러오는 중...</div>;
  }

  return (
    <div style={{ maxWidth: 1000, margin: "40px auto", padding: 20 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <h1>{slideName} 슬라이드 목록</h1>
        <Link to="/slides/create">새 슬라이드 생성</Link>
      </div>

      {slides.length === 0 ? (
        <p>슬라이드가 없습니다.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 20,
          }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: 12,
                overflow: "hidden",
                padding: 12,
              }}
            >
              <img
                src={getImageUrl(slide.image)}
                alt={slide.title || "slide image"}
                style={{
                  width: "100%",
                  height: 180,
                  objectFit: "cover",
                  borderRadius: 8,
                  marginBottom: 12,
                }}
              />

              <p>
                <strong>ID:</strong> {slide.id}
              </p>
              <p>
                <strong>제목:</strong> {slide.title || "-"}
              </p>
              <p>
                <strong>설명:</strong> {slide.description || "-"}
              </p>

              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <Link to={`/slides/${slide.id}/edit`}>
                  <button>수정</button>
                </Link>

                <button onClick={() => handleDelete(slide.id)}>삭제</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
