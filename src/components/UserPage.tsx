import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState('');
  console.log('currentUser: ', currentUser);
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
      <p>Your email address is {currentUser?.email}</p>
      <button onClick={handleClick}>Logout</button>
      {error}
    </div>
  );
};

export default UserPage;
