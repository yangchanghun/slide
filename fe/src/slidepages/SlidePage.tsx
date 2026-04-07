import { useNavigate } from "react-router-dom";

export const SlidePage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen items-center justify-center text-lg">
      <button
        onClick={() => {
          navigate("/slides/1");
        }}
      >
        합정초등학교
      </button>
    </div>
  );
};
