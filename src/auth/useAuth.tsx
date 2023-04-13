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
  ) => Promise<firebase.auth.UserCredential | void>;
  login: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential | void>;
  logout: () => void;
}

export function useAuth(): UseAuth {
  const [user, setUser] = useState<firebase.User | null>(null);
  const { updateUser, clearUser } = useUser();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  const signup = (email: string, password: string) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const login = async (email: string, password: string) => {
    console.log('before return, email: ', email);
    return auth
      .signInWithEmailAndPassword(email, password)
      .then(
        firebase.auth().onAuthStateChanged((user) => {
          // console.log('onAuthStateChanged, login, user:', user?.email);
          setStoredUser(email);
          updateUser(user);
        })
      )
      .catch((error) => console.error(error));
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
