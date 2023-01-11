import React from 'react';
import { render, screen } from '@testing-library/react';

import Form from './Form';

test('renders a component', () => {
  render(<Form formType="signup" />);
  const someElement = screen.getByText('email');
  expect(someElement).toBeInTheDocument();
});
