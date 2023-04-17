import React from 'react';
import Header from '../../components/header';
import MovieList from '../../components/movieList/MovieList2';
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
