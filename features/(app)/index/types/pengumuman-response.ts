export type PengumumanResponse = {
  status?: number;
  message?: string;
  data?: PengumumanData[];
};

export type PengumumanData = {
  id?: number;
  title?: string;
  date?: string;
  pengumuman?: string;
};
