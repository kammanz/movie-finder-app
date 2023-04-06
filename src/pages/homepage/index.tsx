import React from 'react';
import { useAuth } from '../../auth/useAuth';
import { UserEmail } from '../../types';
import Header from '../../components/header';
import MovieList from './MovieList';
import Navbar from '../../components/Navbar';

const Homepage = () => {
  return (
    <>
      <Header />
      <Navbar />
      <MovieList />
    </>
  );
};

export default Homepage;
