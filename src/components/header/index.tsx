import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TCurrentUserEmail } from '../../types/types';
import { useAuth } from '../../context/AuthContext';

const styles = {
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: 'lightsalmon',
};

const Header = ({
  currentUserEmail,
}: {
  currentUserEmail: TCurrentUserEmail;
}) => {
  const [error, setError] = useState('');
  const { logout } = useAuth();

  const handleLogout = async () => {
    setError('');
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      setError('Failed to log out');
    }
  };

  const navigate = useNavigate();
  return (
    <header style={styles}>
      <h1>Welcome, {currentUserEmail}</h1>
      <button onClick={handleLogout}>Logout</button>
      {error && error}
    </header>
  );
};

export default Header;
