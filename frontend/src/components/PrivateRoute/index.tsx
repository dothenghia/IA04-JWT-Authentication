import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user && user.access_token ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;