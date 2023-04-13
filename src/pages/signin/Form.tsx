import React, { useState, FC } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { useAuth } from '../../auth/useAuth';
import { db } from '../../firebase/firebaseSetup';

export type Props = {
  formType: string;
};

const Form: FC<Props> = ({ formType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
              console.log('in signup type');
              const result = await signup(email, password);
              console.log('result: ', result);
              await setDoc(doc(db, 'users', email), {
                movies: [],
              });
            } else if (formType === 'login') {
              console.log('in login type');
              console.log('email', email);
              console.log('password', password);

              // let user;

              // try {
              //   user = await login(email, password);
              //   console.log('in try, user', user);
              // } catch (error) {
              //   console.log('here');
              //   console.error(error);
              // }
              // // const user = await login(email, password);
              // console.log('user: ', user);

              // if (user) {
              //   navigate('/homepage');
              // } else {
              //   setErrorMessage('failed to login');
              // }
              try {
                await login(email, password);

                // if (user) {
                //   navigate('/homepage');
                // }
                // navigate('/homepage');
              } catch (error) {
                console.error(error);
                setErrorMessage('failed to login');
              } finally {
                navigate('/homepage');
              }
            }
          } catch (error) {
            if (error instanceof Error) {
              let errorString = error.message.slice(
                error.message.indexOf(' '),
                error.message.indexOf('(')
              );
              setErrorMessage(errorString);
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
          onChange={() => errorMessage && setErrorMessage('')}
        />
        <p>{errors['email']?.message as unknown as string}</p>
        <p>{formType === 'signup' && errorMessage}</p>
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
          onChange={() => errorMessage && setErrorMessage('')}
        />
        <button
          type="button"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
          {isPasswordVisible ? 'Hide Password' : 'Show Password'}
        </button>
        <br />
        <p>up here:{errors['password']?.message as unknown as string}</p>
        <p>here: {errorMessage}</p>
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
      {/* {errorMessage && <p>{errorMessage}</p>} */}
    </div>
  );
};

export default Form;
