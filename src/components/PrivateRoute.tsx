import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = () => {
  const { currentUser } = useAuth();
  console.log('private route comp: ', currentUser);
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
