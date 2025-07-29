import { Navigate } from 'react-router-dom';

const RequireAdmin = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) return <Navigate to="/login-admin" />;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (!payload.isAdmin) return <Navigate to="/not-authorized" />;
    return children;
  } catch {
    return <Navigate to="/login-admin" />;
  }
};

export default RequireAdmin;
