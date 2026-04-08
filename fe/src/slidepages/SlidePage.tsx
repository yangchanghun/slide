import { useNavigate } from "react-router-dom";

export const SlidePage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen items-center justify-center text-lg">
      <div className="flex flex-col">
        <button
          onClick={() => {
            navigate("/slider/1");
          }}
        >
          합정초등학교
        </button>
        <button
          onClick={() => {
            navigate("/slider/2");
          }}
        >
          수정초등학교
        </button>
      </div>
    </div>
  );
};
