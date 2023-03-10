import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { TCurrentUserEmail } from '../../types/types';
import Homepage from '../homepage';

const UserPage = () => {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState('');
  let currentUserEmail: TCurrentUserEmail = currentUser?.email;

  const navigate = useNavigate();
  const handleClick = async () => {
    setError('');
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      setError('Failed to log out');
    }
  };

  return (
    <div>
      <h1>Welcome to your homepage</h1>
      {/* <p>Your email address is {currentUser?.email}</p> */}
      {/* <Homepage currentUserEmail={currentUserEmail} /> */}
      <button onClick={handleClick}>Logout</button>
      {error}
    </div>
  );
};

export default UserPage;
