import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import { deleteUser } from 'firebase/auth';
import { useAuth } from '../../auth/useAuth';
// import { UserEmail } from '../../types';
import { getAuth, reauthenticateWithCredential } from 'firebase/auth';
import { auth } from '../../firebase/firebaseSetup';
import { db } from '../../firebase/firebaseSetup';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';

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
  const userEmail = auth.currentUser?.email;

  // const db = firebase.firestore();

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
        const provider = new firebase.auth.EmailAuthProvider();
        const password = prompt(
          'Please enter your password to confirm account deletion:'
        );
        // const credential = provider.credential(user.email, password);

        const credential = firebase.auth.EmailAuthProvider.credential(
          user.email as string,
          password as string
        );

        // Reauthenticate the user before deleting their account
        // await user.reauthenticateWithCredential(credential);

        // await user.reauthenticateWithPopup(provider);

        reauthenticateWithCredential(user, credential).then(async () => {
          // const userRef = await firebase
          //   .firestore()
          //   .collection('users')
          //   .doc(user.email as string);

          const userEmail = user?.email as string;
          // const usersRef = await doc(db, 'users', userEmail);

          // const docRef = doc(db, `users`, `${userEmail}`);

          //           const docRef = firestore().collection('myCollection').doc('myDoc') as firestore.DocumentReference;
          // docRef.delete();

          try {
            // await docRef.delete();
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

          // await updateDoc(usersRef, {
          //   userEmail: deleteField(),
          // });

          // await userRef
          //   .delete()
          //   .then(function () {
          //     console.log('document deleted');
          //   })
          //   .catch(function (error) {
          //     console.error('error deleting document', error);
          //   });
        });
      } catch (error) {
        console.error(error);
        // console.log('error.message: ', error.message as stringz);
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
      {/* {error && error} */}
    </header>
  );
};

export default Header;
