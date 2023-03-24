import React from 'react';
import { useAuth } from '../../auth/useAuth';
import { TuserEmail } from '../../types';
import Header from '../../components/header';
import MovieList from './MovieList';

const Homepage = () => {
  const { user } = useAuth();
  let userEmail: TuserEmail = user?.email;

  return (
    <>
      <Header userEmail={userEmail} />
      <MovieList userEmail={userEmail} />
    </>
  );
};

export default Homepage;
