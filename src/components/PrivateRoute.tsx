import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { getStoredUser } from '../user-storage';

const PrivateRoute = () => {
  const user = getStoredUser();

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
