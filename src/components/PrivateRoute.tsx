import React, { ReactNode } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = (children: ReactNode) => {
  const { currentUser } = useAuth();
  return <Route>{currentUser ? children : <Navigate to="/login" />}</Route>;
};

export default PrivateRoute;
