import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const passwordRef = useRef<HTMLInputElement | null>(null);

  let navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { signup } = useAuth();

  const handleSubmit = async (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault();

    if (email && password && passwordRef.current) {
      try {
        setIsLoading(true);
        await signup(email, password);
        setIsLoading(false);
        navigate('login');
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

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (isError) {
      setIsError(false);
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          <Form>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => handleEmailChange(e)}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <input
                type="password"
                ref={passwordRef}
                required
                value={password}
                onChange={(e) => handlePasswordChange(e)}
              />
            </Form.Group>
            {isError && (
              <div style={{ color: 'red', fontSize: 12, padding: '10px 20px' }}>
                {errorMessage}
              </div>
            )}
          </Form>
          <Button
            className="w-100"
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading ? true : false}>
            Sign Up
          </Button>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? Log in
      </div>
    </>
  );
};

export default Signup;
