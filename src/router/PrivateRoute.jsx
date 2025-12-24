// components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function PrivateRoute({ children, allowedRoles = [] }) {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  if (!user) return <Navigate to="/login" />;

  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default PrivateRoute;