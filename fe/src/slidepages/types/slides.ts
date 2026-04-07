export interface Slide {
  id: number;
  slide_name: string;
  title: string | null;
  description: string | null;
  image: string;
}

export interface SlideListResponse {
  slide_name: string;
  slides: Slide[];
}

export interface SlideCreateResponse {
  message: string;
  id: number;
}
