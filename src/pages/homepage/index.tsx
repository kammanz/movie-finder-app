import React from 'react';
import Header from '../../components/header';
import MovieList from './MovieList';
import Navbar from '../../components/navbar/Navbar';

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
