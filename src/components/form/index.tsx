import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { useAuth } from '../../auth/useAuth';
import { db } from '../../firebase/firebaseSetup';
import { parseFirebaseError } from '../../utils';
import { isSignup } from '../../types';
import LoadingOverlay from '../overlay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import styles from './index.module.css';

const Form = ({ isSignup }: { isSignup: isSignup }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [isGuest, setIsGuest] = useState(false);
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

  const questionText = isSignup
    ? 'Already have an account?'
    : `Don't have an account?`;
  const navText = isSignup ? 'Log In' : 'Sign Up';
  const path = isSignup ? '/login' : '/';

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };

  const submitGuest = async () => {
    try {
      setIsGuest(true);
      await loginGuest();
      navigate('/homepage');
    } catch (e) {
      if (e instanceof Error) {
        setError(parseFirebaseError(e));
      }
    }
  };

  const onSubmit = async ({ email, password }: any) => {
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
      console.error('e: ', e);
      if (e instanceof Error) {
        setError(parseFirebaseError(e));
      }
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <h2>{isSignup ? 'Sign Up' : 'Log In'}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <br />
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

        <p>{!isGuest && errors.email?.message}</p>
        <p>{isSignup && error}</p>
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <div className={styles.passwordContainer}>
          <input
            type={passwordVisible ? 'text' : 'password'}
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
            icon={passwordVisible ? faEyeSlash : faEye}
            onClick={togglePasswordVisibility}
            className={styles.eyeIcon}
          />
        </div>
        {!isGuest && <p>{errors.password?.message}</p>}
        {error && <p>{error}</p>}
        <button
          data-testid="submit"
          type="submit"
          disabled={isLoading}
          className={styles.submitButton}>
          Submit
        </button>
        <div className={styles.linkContainer}>
          <div>
            {questionText}{' '}
            <span>
              <Link to={path}>{navText}</Link>
            </span>
          </div>
          <p>OR</p>
          <button onClick={submitGuest} className={styles.guestButton}>
            Continue as Guest
          </button>
        </div>
      </form>
      <LoadingOverlay isLoading={isLoading} />
    </div>
  );
};

export default Form;
