import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import Navbar from '../navbar';
import HamburgerMenu from '../../assets/svgs/hamburgerMenu';
import CloseIcon from '../../assets/svgs/closeIcon';

import styles from './index.module.css';

const Header = () => {
  const [error, setError] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const { user, logout, deleteUserAccount } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      setIsOpen(windowWidth > 767);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const name = user?.email || 'Guest';

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
        setConfirmation('account deleted, redirecting to login page...');
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

  const handleRedirect = async (isSignup: boolean) => {
    setError('');
    try {
      await logout();

      if (isSignup) {
        navigate('/');
      } else {
        navigate('/login');
      }
    } catch (error) {
      setError('Failed to redirect');
    }
  };

  const handleOpenMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={styles.container}>
      <div className={styles.userContainer}>
        <h3 className={styles.greeting}>Welcome, {name}</h3>
      </div>
      <div className={styles.menuContainer}>
        <div
          onClick={handleOpenMenu}
          className={`${styles.svgContainer} ${isOpen ? styles.open : ''}`}>
          {isOpen ? <CloseIcon /> : <HamburgerMenu />}
        </div>
        {isOpen && (
          <div className={styles.toggleContainer}>
            <div className={styles.navContainer}>
              <Navbar />
            </div>
            <div className={styles.buttonContainer}>
              {user?.email ? (
                <>
                  <button onClick={handleLogout}>Logout</button>
                  <button disabled={!user?.email} onClick={handleDeleteRequest}>
                    Delete Account
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => handleRedirect(true)}>Signup</button>
                  <button onClick={() => handleRedirect(false)}>Login</button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      {confirmation && <p>{confirmation}</p>}
      {error && <p>{error}</p>}
    </header>
  );
};

export default Header;
