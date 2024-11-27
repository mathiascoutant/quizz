import { FormDataRegister } from '@/hooks/useRegister';
import { api, constructUrl } from './api.service';
import { useSessionStore } from '@/store/session.store';
import type {User as SessionUser, Session} from  '@/store/session.store';

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

const REFRESH = async ({session, updateUser} : {session: Session; updateUser:  (user: SessionUser) => void}) => {
  if(!session) throw new Error('No session found');

  const response = await api("/profile");

  const data = await response.json() as Session;

  updateUser(data.user)

  if (!response.ok) {
    throw new Error('Error while refresh');
  }
};

const authService = {
  LOGIN,
  REGISTER,
  REFRESH
};

export default authService;
