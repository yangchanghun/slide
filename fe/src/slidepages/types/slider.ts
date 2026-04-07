export interface SlideImage {
  id: number;
  image: string;
  title?: string;
  description?: string;
}

export interface GetSlideImagesResponse {
  slides: SlideImage[];
}
