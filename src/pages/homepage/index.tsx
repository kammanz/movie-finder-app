import React from 'react';
import Header from '../../components/header';
import MovieList from '../../components/movieList';
import Hero from '../../components/hero';

const Homepage = () => {
  return (
    <>
      {/* <Header /> */}
      {/* <Hero /> */}
      <MovieList listType="databaseMovies" />
    </>
  );
};

export default Homepage;
