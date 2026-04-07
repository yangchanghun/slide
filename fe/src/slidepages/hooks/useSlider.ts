import { useQuery } from "@tanstack/react-query";
import { getSlideImages } from "../services/slider";

export const useSliderImagesQuery = (sliderId: number) => {
  return useQuery({
    queryKey: ["slider-images", sliderId],
    queryFn: () => getSlideImages(sliderId),
    enabled: Number.isFinite(sliderId) && sliderId > 0,
  });
};
