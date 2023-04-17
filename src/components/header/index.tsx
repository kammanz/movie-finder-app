import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';

const styles = {
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: 'lightsalmon',
};

const Header = () => {
  const [error, setError] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const { user, logout, deleteUserAccount } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setError('');
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      setError('Failed to log out');
    }
  };

  const handleDelete = async (password: string) => {
    setError('');
    if (user) {
      try {
        await deleteUserAccount(user, password);
        setConfirmation('account deleted');
        setTimeout(() => navigate('/login'), 2000);
      } catch (error) {
        console.error('error: ', error);
        setError('Failed to delete account');
      }
    }
  };

  const handleDeleteRequest = () => {
    const password = prompt(
      'Please enter your password to confirm account deletion:'
    );

    password && handleDelete(password);
  };

  return (
    <header style={styles}>
      <h1>Welcome, {user?.email}</h1>
      {confirmation && <p>{confirmation}</p>}
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleDeleteRequest}>Delete Account</button>

      {error && <p>{error}</p>}
    </header>
  );
};

export default Header;
