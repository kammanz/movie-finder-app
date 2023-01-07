import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Form3 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { signup, login, currentUser } = useAuth();
  const navigate = useNavigate();

  console.log('currentUser: ', currentUser);

  return (
    <div>
      <form
        onSubmit={handleSubmit(async ({ email, password }) => {
          if (!email && !password) return;
          setIsLoading(true);
          try {
            await signup(email, password);
            await navigate('/userPage');
          } catch (error) {
            console.log('error: ', error);
          }
          setIsLoading(false);
        })}>
        <label htmlFor="">Email</label>
        <br />
        <input
          id="email"
          {...register('email', { required: 'Email required' })}
          placeholder="Enter your email"
        />
        <p>{(errors['email']?.message as unknown) as string}</p>
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          id="password"
          {...register('password', {
            required: 'password required',
            minLength: {
              value: 6,
              message: 'Password must be 6 characters long',
            },
          })}
          placeholder="Enter your password"
        />
        <br />
        <p>{(errors['password']?.message as unknown) as string}</p>
        <br />
        <input type="submit" disabled={isLoading ? true : false} />
        <br />
        <Link to="/login">'Already have an account? Click here to log in'</Link>
      </form>
    </div>
  );
};

export default Form3;
