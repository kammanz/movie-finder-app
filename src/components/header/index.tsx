import React from 'react';
import { TCurrentUserEmail } from '../../types/types';

const Header = ({
  currentUserEmail,
}: {
  currentUserEmail: TCurrentUserEmail;
}) => {
  console.log('in Header comp');
  console.log('joblo.currentUser: ', currentUserEmail);
  return <div>Welcome, {currentUserEmail}</div>;
};

export default Header;
