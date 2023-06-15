import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import { getStoredUser } from '../user-storage';

const PrivateRoute = () => {
  const user2 = getStoredUser();
  const { user } = useAuth();
  console.log('user', user);
  console.log('user2', user2);
  console.log('user?.isAnonymous', user?.isAnonymous);

  // console.log('user', user.is);

  return user2 ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
