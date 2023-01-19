import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Form from './Form';
import userEvent from '@testing-library/user-event';

const mockNavigate = jest.fn();
const mockSignUp = jest.fn();
const mockLogin = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock('../context/AuthContext', () => ({
  useAuth: () => ({ signup: mockSignUp, login: mockLogin }),
}));

test('submits signup with correct email and password', async () => {
  render(<Form formType="signup" />);
  const user = userEvent.setup();

  const emailInput = await screen.getByTestId('email');

  const passwordInput = await screen.getByTestId('password');

  await user.type(emailInput, 'jane@gmail.com');
  await user.type(passwordInput, 'secretCode');

  const submit = await screen.getByTestId('submit');
  await user.click(submit);

  await expect(mockSignUp).toHaveBeenCalledWith('jane@gmail.com', 'secretCode');

  expect(mockNavigate).toHaveBeenCalledWith('/userPage');
});

test('submits login with correct email and password', async () => {
  render(<Form formType="login" />);
  const user = userEvent.setup();

  const emailInput = await screen.getByTestId('email');

  const passwordInput = await screen.getByTestId('password');

  await user.type(emailInput, 'jane@gmail.com');
  await user.type(passwordInput, 'secretCode');

  const submit = await screen.getByTestId('submit');
  await user.click(submit);

  await expect(mockLogin).toHaveBeenCalledWith('jane@gmail.com', 'secretCode');

  expect(mockNavigate).toHaveBeenCalledWith('/userPage');
});

test('throws error when submitting with no email or password', async () => {
  render(<Form formType="signup" />);
  // grab submit button
  const submitButton = screen.getByTestId('submit');

  // click submit
  await userEvent.click(submitButton);

  // grab elements
  const emailErrorMsg = await screen.findByText('Email required');

  const passwordErrorMsg = await screen.findByText('Password required');

  // check for email error
  await expect(emailErrorMsg).toBeInTheDocument();
  // check for password error
  await expect(passwordErrorMsg).toBeInTheDocument();

  // check for no page redirect
  expect(mockNavigate).not.toHaveBeenCalled();
});
