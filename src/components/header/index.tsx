import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import { TuserEmail } from '../../types';

const styles = {
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: 'lightsalmon',
};

const Header = ({ userEmail }: { userEmail: TuserEmail }) => {
  const [error, setError] = useState('');
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log('handleLogout ran');
    setError('');
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      setError('Failed to log out');
    }
  };

  return (
    <header style={styles}>
      <h1>Welcome, {userEmail}</h1>
      <button onClick={handleLogout}>Logout</button>
      {error && error}
    </header>
  );
};

export default Header;
