import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import { TuserEmail } from '../../types';
import Header from '../../components/header';
import MovieList from './MovieList';
import Navbar from './Navbar';

const Homepage = () => {
  const { user } = useAuth();
  let userEmail: TuserEmail = user?.email;

  return (
    <>
      <Header userEmail={userEmail} />
      <Navbar />
      <Link to="/savedMovies">My Saved Movies</Link>
      <MovieList userEmail={userEmail} />
    </>
  );
};

export default Homepage;
