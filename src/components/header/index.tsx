import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import {
  getAuth,
  deleteUser,
  reauthenticateWithCredential,
} from 'firebase/auth';
import { db } from '../../firebase/firebaseSetup';
import { doc, deleteDoc } from 'firebase/firestore';
import { useAuth } from '../../auth/useAuth';
import { clearStoredUser } from '../../user-storage';

const styles = {
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: 'lightsalmon',
};

const Header = () => {
  const [error, setError] = useState('');
  const { logout } = useAuth();
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const handleLogout = async () => {
    setError('');
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      setError('Failed to log out');
    }
  };

  const handleDelete = async () => {
    if (user) {
      try {
        const password = prompt(
          'Please enter your password to confirm account deletion:'
        );
        const credential = firebase.auth.EmailAuthProvider.credential(
          user.email as string,
          password as string
        );

        reauthenticateWithCredential(user, credential).then(async () => {
          const userEmail = user?.email as string;
          try {
            await deleteDoc(doc(db, 'users', `${userEmail}`));
            try {
              await deleteUser(user);
              clearStoredUser();
              navigate('/login');
            } catch (error) {
              console.error('error', error);
              setError('failed to delete doc from firestore');
            }
          } catch (error) {
            console.error('error', error);
            setError('failed to retrieve doc from firestore');
          }
        });
      } catch (error) {
        console.error(error);
        setError('failed to delete account');
      }
    }
  };

  return (
    <header style={styles}>
      <h1>Welcome, {user?.email}</h1>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleDelete}>Delete Account</button>
      {error && <p>{error}</p>}
    </header>
  );
};

export default Header;
