import React, { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthHook } from './core/hooks/use-auth';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuthHook();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
