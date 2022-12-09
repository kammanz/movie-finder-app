import React, {
  ReactNode,
  FC,
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import firebase from 'firebase/compat/app';
import { auth } from '../firebaseSetup';

type AuthContextType = {
  currentUser: firebase.User | null;
  signup: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential | void>;
};

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  signup: (email: string, password: string) => Promise.resolve(),
});

export const useAuth = () => {
  return useContext(AuthContext);
};

interface Props {
  children: ReactNode;
}

const AuthProvider: FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);

  const signup = (email: string, password: string) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
