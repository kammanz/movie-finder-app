import React, {
  ReactNode,
  FC,
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import firebase from 'firebase/compat/app';
import { auth } from '../firebase/firebaseSetup';
import { signOut } from 'firebase/auth';
import { useUser } from 'reactfire';
// import { useUser } from '../components/user/hooks/useUser';

type AuthContextType = {
  currentUser: firebase.User | null;
  signup: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential | void>;
  login: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential | void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  signup: (email: string, password: string) => Promise.resolve(),
  login: (email: string, password: string) => Promise.resolve(),
  logout: () => Promise.resolve(),
});

export const useAuth = () => {
  return useContext(AuthContext);
};

interface Props {
  children: ReactNode;
}

const AuthProvider: FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  // const { setUser } = useUser();

  // const { updateUser } = useUser();

  const signup = (email: string, password: string) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const login = (email: string, password: string) => {
    // updateUser(currentUser);

    // const { setUser } = useUser();

    return auth.signInWithEmailAndPassword(email, password);
    // auth
    //   .signInWithEmailAndPassword(email, password)
    //   .then((userCredential) => {
    //     const user = userCredential.user;

    //     setUser(user);
    //   })
    //   .catch((error) => console.log(error));
  };

  const logout = () => {
    return signOut(auth);
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
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
