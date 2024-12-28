export type ImageResponse = {
  status?: number;
  message?: string;
  data?: ImageData[];
};

export type ImageData = {
  id?: number;
  filename?: string;
  mime?: string;
  extension?: string;
  imageUrl?: string;
  thumbUrl?: string;
  userId?: number;
};
