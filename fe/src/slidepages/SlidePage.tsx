import { useNavigate } from "react-router-dom";

export const SlidePage = () => {
  const navigate = useNavigate();

  const schools = [
    { id: 1, name: "합정초등학교" },
    { id: 2, name: "수정초등학교" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl bg-white/90 backdrop-blur-sm shadow-2xl border border-gray-100 p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">학교 슬라이드</h1>
        </div>

        <div className="flex flex-col gap-4">
          {schools.map((school) => (
            <button
              key={school.id}
              onClick={() => navigate(`/slider/${school.id}`)}
              className="group w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-400 hover:bg-blue-50 hover:shadow-lg active:scale-[0.98]"
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
                  {school.name}
                </span>
                <span className="text-gray-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-blue-500">
                  →
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
