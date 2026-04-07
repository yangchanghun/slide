import { useState } from "react";
import { createSlide } from "./services/slide";
import { useNavigate } from "react-router-dom";

export default function SlideCreatePage() {
  const navigate = useNavigate();

  const [slideName, setSlideName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!slideName.trim()) {
      alert("slide_name을 입력해주세요.");
      return;
    }

    if (!image) {
      alert("이미지를 선택해주세요.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("slide_name", slideName);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);

      const res = await createSlide(formData);
      console.log(res);
      alert("슬라이드 생성 완료");
      navigate(`/slides/${slideName}`);
    } catch (error) {
      console.error(error);
      alert("슬라이드 생성 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 20 }}>
      <h1>슬라이드 생성</h1>

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
          {loading ? "생성 중..." : "생성하기"}
        </button>
      </form>
    </div>
  );
}
