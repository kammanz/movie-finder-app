import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { getStoredUser } from '../user-storage';

const PrivateRoute = () => {
  console.log('in private route');
  const user = getStoredUser();
  console.log('user: ', user);
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
