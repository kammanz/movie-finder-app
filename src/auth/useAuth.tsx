import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import {
  signOut,
  deleteUser,
  reauthenticateWithCredential,
  User,
  getAuth,
} from 'firebase/auth';
import { auth, db } from '../firebase/firebaseSetup';
import { useUser } from '../components/user/hooks/useUser';
import { setStoredUser } from '../user-storage';
import { doc, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { clearStoredUser } from '../user-storage';

interface UseAuth {
  user: firebase.User | null;
  signup: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  login: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  logout: () => void;
  deleteAccount: (
    user: firebase.User,
    password: string
  ) => Promise<unknown | Error>;
}

export function useAuth(): UseAuth {
  const [user, setUser] = useState<firebase.User | null>(null);
  const { updateUser, clearUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (email: string, password: string) => {
    const result = await auth.createUserWithEmailAndPassword(email, password);
    if (result.user) {
      setStoredUser(email);
      updateUser(result.user);
    }

    return result;
  };

  const login = async (email: string, password: string) => {
    const result = await auth.signInWithEmailAndPassword(email, password);
    if (result.user) {
      setStoredUser(email);
      updateUser(result.user);
    }

    return result;
  };

  const logout = () => {
    clearUser();
    return signOut(auth);
  };

  const deleteAccount = async (user: firebase.User, password: string) => {
    if (user) {
      const credential = firebase.auth.EmailAuthProvider.credential(
        user.email as string,
        password as string
      );

      try {
        await reauthenticateWithCredential(user, credential);
      } catch (error) {
        console.error('error', error);
        return error;
      }

      try {
        await deleteDoc(doc(db, 'users', `${user.email}`));
      } catch (error) {
        console.error('error', error);
        return error;
      }

      try {
        await deleteUser(user);
      } catch (error) {
        console.error('error', error);
        return error;
      }

      clearStoredUser();
      // setTimeout(() => navigate('/login'), 2000);
    }
  };

  return { user, signup, login, logout, deleteAccount };
}
