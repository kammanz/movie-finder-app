import React from 'react';
import { useAuth } from '../context/AuthContext';

const UserPage = () => {
  const { currentUser } = useAuth();
  console.log('currentUser: ', currentUser);
  return <div>Welcome to user page</div>;
};

export default UserPage;
