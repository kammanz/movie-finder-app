import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Form.module.css';

type Props = {
  isSignup: boolean;
};

const Form: React.FC<Props> = ({ isSignup }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const { signup, login } = useAuth();
  let navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (isError) {
      setIsError(false);
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    console.log('clicked');

    if (email && password && passwordRef.current) {
      console.log('isSignup', isSignup);
      try {
        if (isSignup) {
          setIsLoading(true);
          await signup(email, password);
          setIsLoading(false);
          navigate('login');
        } else {
          console.log('login');
          setIsLoading(true);
          await login(email, password);
          setIsLoading(false);
          window.location.pathname.replace('/login', '');
          navigate(`/userPage`);
        }
      } catch (error) {
        if (error instanceof Error) {
          let newString = error.message.slice(
            error.message.indexOf(' '),
            error.message.indexOf('.')
          );
          setErrorMessage(newString);
        }
        setIsError(true);
        setIsLoading(false);
        setPassword('');
        passwordRef.current.focus();
      }
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>{isSignup}</h2>
      <form>
        <fieldset id="email">
          <label htmlFor="email">Email</label>
          <br />
          <input
            required
            type="email"
            id="email"
            value={email}
            onChange={(e) => handleEmailChange(e)}
          />
        </fieldset>
        <fieldset id="password">
          <label htmlFor="password">Password</label>
          <br />
          <input
            required
            type="password"
            ref={passwordRef}
            id="password"
            value={password}
            onChange={(e) => handlePasswordChange(e)}
          />
        </fieldset>
        <br />
        {isError && (
          <div style={{ color: 'red', fontSize: 12, padding: '10px 20px' }}>
            {errorMessage}
          </div>
        )}
        <button
          className="w-100"
          type="submit"
          onClick={handleSubmit}
          disabled={isLoading ? true : false}>
          {isSignup ? 'Sign Up' : 'Login'}
        </button>
        <Link to={isSignup ? '/login' : '/'}>
          {isSignup
            ? 'Already have an account? Click here to log in'
            : 'Need an account? Click here to sign up'}
        </Link>
      </form>
    </div>
  );
};

export default Form;
