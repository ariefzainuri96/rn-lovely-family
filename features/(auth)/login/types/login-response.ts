export type LoginResponse = {
  status?: number;
  message?: string;
  data?: LoginData;
};

export type LoginData = {
  id?: number;
  name?: string;
  email?: string;
};
