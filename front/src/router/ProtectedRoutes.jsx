import { Navigate, Outlet } from 'react-router-dom';
import { useSessionStore } from '../store/session.store';

export const ProtectedRoute = () => {
  const session = useSessionStore((state) => state.session);

  return session ? <Outlet /> : <Navigate to="/login" />;
};
