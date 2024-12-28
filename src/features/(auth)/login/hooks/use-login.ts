import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import useAxios from '../../../../hooks/networking/use-axios';
import { useAuth } from '@/src/features/auth-context';
import { ZodValidationError } from '@/src/types/zod-validation-error';
import { LoginForm, ZLoginForm } from '../types/login-form';
import { LoginResponse } from '../types/login-response';
import { useCustomDialogLoadingContext } from '@/src/components/CustomDialogLoading/CustomDialogLoadingContext';
import { useToast } from '@/src/components/CustomToast';
import { AxiosError } from 'axios';

export default function useLogin() {
  const auth = useAuth();
  const axios = useAxios();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const { showLoading, hideLoading } = useCustomDialogLoadingContext();
  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<ZodValidationError[]>([]);

  const mutationLogin = useMutation({
    mutationKey: [],
    mutationFn: async (form: LoginForm) => {
      showLoading('Loading...');
      return (await axios.post<LoginResponse>('/users/login', form)).data;
    },
    onSuccess: (data) => {
      hideLoading();

      auth?.signIn(data.data ?? '');
    },
    onError: (error) => {
      hideLoading();
      toast.showToast(
        error instanceof AxiosError
          ? (error.response?.data.message ?? 'Failed to login!')
          : 'Failed to login!'
      );
    },
  });

  function handleChange(key: keyof LoginForm, value: any) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleLogin() {
    setErrors([]);
    const validate = ZLoginForm.safeParse(form);

    if (!validate.success) {
      const { errors } = validate.error;

      const _errors: ZodValidationError[] = errors.map((item) => {
        return {
          path: item.path,
          message: item.message,
        };
      });

      setErrors(_errors);
      return;
    }

    if (mutationLogin.isPending) return;

    mutationLogin.mutate(form);
  }

  return {
    handleChange,
    handleLogin,
    showPassword,
    setShowPassword,
    form,
    mutationLogin,
    errors,
    toast,
  };
}
