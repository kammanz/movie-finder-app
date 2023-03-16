import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseSetup';
import { useUser } from '../components/user/hooks/useUser';

interface UseAuth {
  user: firebase.User | null;

  signup: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential | void>;
  login: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential | void>;
  logout: () => void;
}

export function useAuth(): UseAuth {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  const { updateUser } = useUser();
  const signup = (email: string, password: string) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const login = (email: string, password: string) => {
    console.log('login called');
    console.log('in log in, user:', user);
    console.log('in log in, updateUser(user):', updateUser(user));
    updateUser(user);
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    console.log('logout called');
    return signOut(auth);
  };

  return { user, signup, login, logout };
}
