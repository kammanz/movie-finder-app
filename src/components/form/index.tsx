import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { useAuth } from '../../auth/useAuth';
import { db } from '../../firebase/firebaseSetup';
import { parseFirebaseError } from '../../utils';
import { FormType } from '../../types';
import LoadingOverlay from '../overlay';

const Form = ({ formType }: { formType: FormType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordType, setPasswordType] = useState<'password' | 'text'>(
    'password'
  );
  const [error, setError] = useState('');

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

  const { signup, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setError('');
  }, []);

  const onSubmit = async ({ email, password }: any) => {
    if (!email && !password) return;
    setIsLoading(true);
    try {
      if (formType === 'signup') {
        await signup(email.trim(), password.trim());
        await setDoc(doc(db, 'users', email.trim()), {
          movies: [],
        });
      } else if (formType === 'login') {
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
    <div>
      <h2>{formType}</h2>
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
        />
        <p>{errors.email?.message}</p>
        <p>{formType === 'signup' && error}</p>
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          data-testid="password"
          type={passwordType}
          id="password"
          {...register('password', {
            required: 'Password required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
          placeholder="Enter your password"
        />
        <button
          type="button"
          onClick={() =>
            setPasswordType(passwordType === 'password' ? 'text' : 'password')
          }>
          {passwordType === 'password' ? 'Show Password' : 'Hide Password'}
        </button>
        <br />
        <p>{errors.password?.message}</p>
        <p>{error}</p>
        <br />
        <button data-testid="submit" type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
        <br />
        <Link to={formType === 'signup' ? '/login' : '/'}>
          {formType === 'signup'
            ? 'Already have an account? Click here to log in'
            : 'Dont have an account? Click here to sign up'}
        </Link>
      </form>
      {isLoading && <LoadingOverlay />}
    </div>
  );
};

export default Form;
