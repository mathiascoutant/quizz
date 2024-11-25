import authService from '@/services/auth.service';
import { useMutation } from '@tanstack/react-query';
import { useLogin } from './useLogin';

export type FormDataRegister = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  pseudo: string;
};

export const useRegister = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { mutate: mutateLogin } = useLogin();

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (data: FormDataRegister) => {
      return await authService.REGISTER(data);
    },
    onError: () => {
      throw new Error('An error occurred while registering');
    },
    onSuccess(_) {
      mutateLogin({
        email,
        password,
      });
    },
  });

  return {
    mutate,
    isPending,
    error,
  };
};
