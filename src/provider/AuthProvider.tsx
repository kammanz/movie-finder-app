// import React, { useEffect, useState, FC } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import firebase from 'firebase/compat/app';
// import { auth } from '../firebaseSetup';

// interface Props {
//   children: React.ReactNode;
// }

// export const AuthProvider: FC<Props> = ({ children }) => {
//   const [user, setUser] = useState<firebase.User | null>(null);

//   const signup = (email: string, password: string) => {
//     return auth.createUserWithEmailAndPassword(email, password);
//   };

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
//       setUser(firebaseUser);
//     });

//     return unsubscribe;
//   }, []);

//   const value = {
//     signup,
//     user,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

export {};
