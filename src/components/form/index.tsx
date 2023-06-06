import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../auth/useAuth';
import { db } from '../../firebase/firebaseSetup';
import { parseFirebaseError } from '../../utils';
import LoadingOverlay from '../overlay';
import styles from './index.module.css';

const Form = ({ isSignup }: { isSignup: boolean }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [firebaseError, setFirebaseError] = useState('');
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { signup, login, loginGuest } = useAuth();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmitGuest = async () => {
    try {
      setIsGuest(true);
      await loginGuest();
      navigate('/homepage');
    } catch (e) {
      if (e instanceof Error) {
        setFirebaseError(parseFirebaseError(e));
      }
    }
  };

  const handleSubmitUser = async ({ email, password }: any) => {
    if (!email && !password) return;
    setIsLoading(true);
    try {
      if (isSignup === true) {
        await signup(email.trim(), password.trim());
        await setDoc(doc(db, 'users', email.trim()), {
          movies: [],
        });
      } else {
        await login(email.trim(), password.trim());
      }
      navigate('/homepage');
    } catch (e) {
      if (e instanceof Error) {
        setFirebaseError(parseFirebaseError(e));
      }
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{isSignup ? 'Signup' : 'Login'}</h2>
      <form onSubmit={handleSubmit(handleSubmitUser)}>
        <div className={styles.emailContainer}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            data-testid="email"
            {...register('email', {
              required: 'Email required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Invalid email format',
              },
            })}
            placeholder="Enter your email"
            className={styles.input}
          />
          <p className={styles.error}>{!isGuest && errors.email?.message}</p>
        </div>
        <div className={styles.passwordContainer}>
          <label htmlFor="password">Password</label>
          <div className={styles.inputContainer}>
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              data-testid="password"
              id="password"
              {...register('password', {
                required: 'Password required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              placeholder="Enter your password"
              className={styles.input}
            />
            <FontAwesomeIcon
              icon={isPasswordVisible ? faEyeSlash : faEye}
              onClick={togglePasswordVisibility}
              className={styles.eyeIcon}
            />
          </div>
          <p className={styles.error}>{!isGuest && errors.password?.message}</p>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={styles.submitButton}>
          Submit
        </button>
        {firebaseError && <p className={styles.error}>{firebaseError}</p>}
        <div className={styles.linkContainer}>
          <div className={styles.navContainer}>
            <p>
              {isSignup ? 'Already have an account?' : `Don't have an account?`}{' '}
              <span>
                <Link to={isSignup ? '/login' : '/'}>
                  {isSignup ? 'Login' : 'Signup'}
                </Link>
              </span>
              <br />
              <br />
              OR
            </p>
          </div>
          <button onClick={handleSubmitGuest} className={styles.guestButton}>
            Continue as Guest
          </button>
        </div>
      </form>
      <LoadingOverlay isLoading={isLoading} />
    </div>
  );
};

export default Form;
