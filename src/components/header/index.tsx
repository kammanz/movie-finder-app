import React from 'react';
import { TCurrentUserEmail } from '../../types/types';

const styles = {
  backgroundColor: 'lightsalmon',
};

const Header = ({
  currentUserEmail,
}: {
  currentUserEmail: TCurrentUserEmail;
}) => {
  console.log('in Header comp');
  console.log('joblo.currentUser: ', currentUserEmail);
  return (
    <header style={styles}>
      <h1>Welcome, {currentUserEmail}</h1>
    </header>
  );
};

export default Header;
