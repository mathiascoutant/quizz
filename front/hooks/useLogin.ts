import authService from '@/services/auth.service';
import type { User } from '@/store/session.store';
import { useSessionStore } from '@/store/session.store';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

type FormData = {
  email: string;
  password: string;
};

export const useLogin = () => {
  const sessionLogIn = useSessionStore((state) => state.sessionLogIn);
  const router = useRouter();

  const { mutate, isPending, error } = useMutation({
    // @ts-expect-error mutation return type is not correct i'll fix it later
    mutationFn: async (data: FormData) => {
      return await authService.LOGIN(data);
    },
    onError: () => {
      throw new Error('An error occurred');
    },
    onSuccess(data: { token: string; user: User }) {
      sessionLogIn(data);
      router.push('/');
    },
  });

  return {
    mutate,
    isPending,
    error,
  };
};
