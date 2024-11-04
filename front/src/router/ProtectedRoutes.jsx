import { Navigate } from 'react-router-dom';
import { useSessionStore } from '../store/session.store';

export const ProtectedRoute = ({ children }) => {
  const session = useSessionStore((state) => state.session);

  return session ? children : <Navigate to="/login" />;
};
