import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';

const PrivateRoute = () => {
  const [isUserSignedIn, setIsUserSignedIn] = useState<boolean>(true);

  firebase
    .auth()
    .onAuthStateChanged((user) => !user && setIsUserSignedIn(false));

  return isUserSignedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
