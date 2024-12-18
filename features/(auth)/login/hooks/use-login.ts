import { useAuth } from '@/features/auth-context';
import { LoginForm, LoginSchema } from '@/features/(auth)/login/types/login-form';
import { ZodValidationError } from '@/types/zod-validation-error';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { NIS, PASSWORD } from '@/constants/secure-store-key';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../../hooks/networking/use-axios';
import { LoginResponse } from '@/features/(auth)/login/types/login-response';

export default function useLogin() {
  const auth = useAuth();
  const axios = useAxios();
  const [form, setForm] = useState<LoginForm>({
    nis: '',
    password: '',
    isRememberMe: false,
  });

  const queryLogin = useQuery({
    queryKey: [],
    queryFn: async () => {
      return (await axios.get<LoginResponse>('/login')).data.data;
    },
    enabled: false,
  });

  useEffect(() => {
    if (SecureStore.getItem(NIS) && SecureStore.getItem(PASSWORD)) {
      setForm((prev) => ({
        ...prev,
        nis: SecureStore.getItem(NIS) ?? '',
        password: SecureStore.getItem(PASSWORD) ?? '',
        isRememberMe: true,
      }));
    }
  }, []);

  function handleChange(key: string, value: any) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleLogin() {
    const validate = LoginSchema.safeParse(form);

    if (!validate.success) {
      const { errors } = validate.error;

      const _errors: ZodValidationError[] = errors.map((item) => {
        return {
          path: item.path,
          message: item.message,
        };
      });

      setForm((prev) => ({ ...prev, errors: _errors }));
      return;
    }

    if (queryLogin.isLoading) return;

    const data = await queryLogin.refetch();

    if (data.status === 'success') {
      if (form.isRememberMe) {
        SecureStore.setItem(NIS, form.nis);
        SecureStore.setItem(PASSWORD, form.password);
      }

      auth?.signIn(form.nis);
    }
  }

  return {
    handleChange,
    handleLogin,
    form,
    queryLogin,
  };
}
