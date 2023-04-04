import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import { UserEmail } from '../../types';
import Header from '../../components/header';
import MovieList from './MovieList';
import Navbar from './Navbar';

const Homepage = () => {
  const { user } = useAuth();
  let userEmail: UserEmail = user?.email;

  // 1. import hook here, movies or saved movies prop
  // 2. movieList needs props: movieArray, listType
  // 3. url will need to be updated: homepage-movies, or homepage-savedMovies

  return (
    <>
      <Header />
      <Navbar />
      <Link to="/savedMovies">My Saved Movies</Link>
      <MovieList />
    </>
  );
};

export default Homepage;
