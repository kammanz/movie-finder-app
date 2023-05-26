import React, { useState } from 'react';
import Header from '../../components/header';
import MovieList from '../../components/movieList';

const SavedMovies = () => {
  return (
    <>
      <Header />
      <MovieList listType="usersSavedMovies" />
    </>
  );
};

export default SavedMovies;
