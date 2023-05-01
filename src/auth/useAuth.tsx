import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import {
  signOut,
  deleteUser,
  reauthenticateWithCredential,
} from 'firebase/auth';
import { auth, db } from '../firebase/firebaseSetup';
import { doc, deleteDoc } from 'firebase/firestore';
import { setStoredUser, clearStoredUser } from '../user-storage';

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
  deleteUserAccount: (user: firebase.User, password: string) => Promise<void>;
  loginGuest: () => Promise<any>;
}

export function useAuth(): UseAuth {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const signup = async (email: string, password: string) => {
    const result = await auth.createUserWithEmailAndPassword(email, password);
    if (result.user) {
      setStoredUser(result.user.uid);
    }
    return result;
  };

  const login = async (email: string, password: string) => {
    const result = await auth.signInWithEmailAndPassword(email, password);
    if (result.user) {
      setStoredUser(result.user.uid);
    }
    return result;
  };

  const loginGuest = async () => {
    const result = await firebase.auth().signInAnonymously();
    if (result.user) {
      setStoredUser('guest');
    }
    return result;
  };

  const logout = () => {
    clearStoredUser();
    return signOut(auth);
  };

  const deleteUserAccount = async (user: firebase.User, password: string) => {
    if (!user) {
      return;
    }

    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email as string,
      password as string
    );

    await reauthenticateUser(user, credential);
    await deleteUserDocsFromFirestore(user);
    await deleteUserAccountFromFirebase(user);
    clearStoredUser();
  };

  const reauthenticateUser = async (
    user: firebase.User,
    credential: firebase.auth.AuthCredential
  ) => {
    try {
      await reauthenticateWithCredential(user, credential);
    } catch (error) {
      console.error('Failed to reauthenticate user:', error);
      throw new Error('Failed to reauthenticate user');
    }
  };

  const deleteUserDocsFromFirestore = async (user: firebase.User) => {
    const userDocRef = doc(db, 'users', `${user.email}`);
    try {
      await deleteDoc(userDocRef);
    } catch (error) {
      console.error('Failed to delete user document:', error);
      throw new Error('Failed to delete user document');
    }
  };

  const deleteUserAccountFromFirebase = async (user: firebase.User) => {
    try {
      await deleteUser(user);
    } catch (error) {
      console.error('Failed to delete user account:', error);
      throw new Error('Failed to delete user account');
    }
  };

  return { user, signup, login, loginGuest, logout, deleteUserAccount };
}
