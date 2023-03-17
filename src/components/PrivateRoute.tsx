import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useUser } from '../components/user/hooks/useUser';

const PrivateRoute = () => {
  const { user } = useUser();
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
