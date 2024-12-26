import { z } from 'zod';

export type LoginForm = {
  email: string;
  password: string;
};

export const ZLoginForm = z.object({
  email: z.string().min(1, { message: 'Email tidak boleh kosong' }).default(''),
  password: z.string().min(1, { message: 'Password tidak boleh kosong' }).default(''),
});
