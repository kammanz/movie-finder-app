import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import { signOut, deleteUser } from 'firebase/auth';
import { auth } from '../firebase/firebaseSetup';
import { useUser } from '../components/user/hooks/useUser';
import { setStoredUser } from '../user-storage';

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
}

export function useAuth(): UseAuth {
  const [user, setUser] = useState<firebase.User | null>(null);
  const { updateUser, clearUser } = useUser();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const signup = (email: string, password: string) => {
    return auth.createUserWithEmailAndPassword(email, password);
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

  // const deleteAccount = () => {
  //   deleteUser(user).then(()=> {
  //     // user deleted
  //   })
  // }

  return { user, signup, login, logout };
}
