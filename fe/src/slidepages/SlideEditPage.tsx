import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSlideDetail, updateSlide } from "./services/slide";

export default function SlideEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [slideName, setSlideName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;

      try {
        const data = await getSlideDetail(Number(id));
        setSlideName(data.slide_name);
        setTitle(data.title || "");
        setDescription(data.description || "");
      } catch (error) {
        console.error(error);
        alert("상세 조회 실패");
      }
    };

    fetchDetail();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("slide_name", slideName);
      formData.append("title", title);
      formData.append("description", description);

      if (image) {
        formData.append("image", image);
      }

      await updateSlide(Number(id), formData);

      alert("수정 완료");
      navigate(`/slides/${id}`);
    } catch (error) {
      console.error(error);
      alert("수정 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 20 }}>
      <h1>슬라이드 수정</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
      >
        <input
          type="text"
          placeholder="slide_name"
          value={slideName}
          onChange={(e) => setSlideName(e.target.value)}
        />

        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "수정 중..." : "수정하기"}
        </button>
      </form>
    </div>
  );
}
