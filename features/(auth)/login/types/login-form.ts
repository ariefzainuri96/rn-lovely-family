import { z } from 'zod';
import { ZodValidationError } from '../../../../types/zod-validation-error';

export type LoginForm = {
  nis: string;
  password: string;
  isRememberMe: boolean;
  errors?: ZodValidationError[];
};

export const LoginSchema = z.object({
  nis: z.string().min(1, { message: 'NIS tidak boleh kosong' }).default(''),
  password: z.string().min(1, { message: 'Password tidak boleh kosong' }).default(''),
});
