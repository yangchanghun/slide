import type { GetSlideImagesResponse } from "../types/slider";
import axios from "axios";

export const api = axios.create({
  baseURL: "https://kioquiz.kioedu.co.kr/api/",
});

export const getSlideImages = async (
  sliderId: number,
): Promise<GetSlideImagesResponse> => {
  const res = await api.get<GetSlideImagesResponse>(`slide/group/${sliderId}/`);
  console.log("res:", res);
  return res.data;
};
