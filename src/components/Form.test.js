import React from "react";
import { render, screen } from "@testing-library/react";

import Form from "./Form";

// use as a reference - https://github.com/D-Pagey/aldgate/blob/main/tests/index.test.tsx

const mockNavigate = jest.fn();
const mockSignUp = jest.fn();
const mockLogin = jest.fn();

jest.mock("react-router-dom", () => ({
  // Link: ({ children }) => <p>{children}</p>,
  useNavigate: () => mockNavigate,
}));

jest.mock("../context/AuthContext", () => ({
  useAuth: () => ({ signup: mockSignUp, login: mockLogin }),
}));

test.todo("");

test("renders a component", () => {
  render(<Form formType="signup" />);

  const emailInput = screen.getByText("Email");
  // type in the email field with userEvent library

  const passwordInput = screen.getByText("Password");
  // type in the password field with userEvent library
  user.type(passwordInput, "secretCode");
  // grab the submit button screen.getByText
  // click that button

  expect(mockLogin).toHaveBeenCalledWith(email, "secretCode");
  expect(mockNavigate).toHaveBeenCalledWith("/userPage");
});

test("shows an error", () => {
  render(<Form formType="signup" />);

  // 1 - grab the submit button
  // 2 - click it
  // 3 - text should be on the page "Email required"
  // 4 - text should be on the page "password required"

  expect(mockNavigate).not.toHaveBeenCalledWith("/userPage");
});
