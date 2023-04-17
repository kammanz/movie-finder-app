import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { useAuth } from '../../auth/useAuth';
import { db } from '../../firebase/firebaseSetup';
import { parseFirebaseError } from '../../utils/utils';
import { FormType } from '../../types';

const Form = ({ formType }: { formType: FormType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
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

  return (
    <div>
      <h2>{formType}</h2>
      <form
        onSubmit={handleSubmit(async ({ email, password }) => {
          if (!email && !password) return;
          setIsLoading(true);
          try {
            if (formType === 'signup') {
              try {
                await signup(email, password);
                await setDoc(doc(db, 'users', email), {
                  movies: [],
                });
              } catch (error) {
                if (error instanceof Error) {
                  setError(parseFirebaseError(error));
                }
              }
            } else if (formType === 'login') {
              try {
                await login(email, password);
              } catch (error) {
                if (error instanceof Error) {
                  setError(parseFirebaseError(error));
                }
              }
            }
            navigate('/homepage');
          } catch (error) {
            if (error instanceof Error) {
              setError(parseFirebaseError(error));
            }
          }
          setIsLoading(false);
        })}>
        <label htmlFor="email">Email</label>
        <br />
        <input
          id="email"
          data-testid="email"
          {...register('email', {
            required: 'Email required',
          })}
          placeholder="Enter your email"
          onChange={() => error && setError('')}
          onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
        />
        <p>{errors['email']?.message as unknown as string}</p>
        <p>{formType === 'signup' && error}</p>
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          data-testid="password"
          type={isPasswordVisible ? 'text' : 'password'}
          id="password"
          {...register('password', {
            required: 'Password required',
            minLength: {
              value: 6,
              message: 'Password must be 6 characters',
            },
          })}
          placeholder="Enter your password"
          onChange={() => error && setError('')}
        />
        <button
          type="button"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
          {isPasswordVisible ? 'Hide Password' : 'Show Password'}
        </button>
        <br />
        <p>Password error:{errors['password']?.message as unknown as string}</p>
        <p>Firebase error: {error}</p>
        <br />
        <button
          data-testid="submit"
          type="submit"
          disabled={isLoading ? true : false}>
          Submit
        </button>
        <br />
        <Link to={formType === 'signup' ? '/login' : '/'}>
          {formType === 'signup'
            ? 'Already have an account? Click here to log in'
            : 'Dont have an account? Click here to sign up'}
        </Link>
      </form>
    </div>
  );
};

export default Form;
