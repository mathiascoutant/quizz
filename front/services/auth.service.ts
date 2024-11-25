import { FormDataRegister } from '@/hooks/useRegister';
import { constructUrl } from './api.service';

export interface User {
  id: string;
  email: string;
  pseudo: string;
  firstName: string;
  lastName: string;
  password: string;
  coins: number;
}

const LOGIN = async (body: { email: string; password: string }) => {
  const response = await fetch(constructUrl('/auth/login'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('Error while login');
  }

  return (await response.json()) as { token: string; user: User };
};

const REGISTER = async (body: FormDataRegister) => {
  const response = await fetch(constructUrl('/auth/register'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('Error while registering');
  }
};

const authService = {
  LOGIN,
  REGISTER,
};

export default authService;
