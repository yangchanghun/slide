import type {
  Slide,
  SlideCreateResponse,
  SlideListResponse,
} from "../types/slides";
// 슬라이드 생성

import axios from "axios";

export const api = axios.create({
  baseURL: "https://kioquiz.kioedu.co.kr/api/",
});

export const createSlide = async (
  formData: FormData,
): Promise<SlideCreateResponse> => {
  const res = await api.post<SlideCreateResponse>("/slide/create/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// 슬라이드 상세 조회
export const getSlideDetail = async (slideId: number): Promise<Slide> => {
  const res = await api.get<Slide>(`/slide/${slideId}/`);
  return res.data;
};

// slide_name 기준 그룹 조회
export const getSlidesByName = async (
  slideName: string,
): Promise<SlideListResponse> => {
  const res = await api.get<SlideListResponse>(`/slide/group/${slideName}/`);
  return res.data;
};

// 슬라이드 수정
export const updateSlide = async (slideId: number, formData: FormData) => {
  const res = await api.patch(`/slide/${slideId}/update/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// 슬라이드 삭제
export const deleteSlide = async (slideId: number) => {
  const res = await api.delete(`/slide/${slideId}/delete/`);
  return res.data;
};
