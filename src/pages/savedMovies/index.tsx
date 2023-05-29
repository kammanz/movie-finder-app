import React from 'react';
import Header from '../../components/header';
import MovieList from '../../components/movieList';

const SavedMovies = () => {
  return (
    <div>
      <Header />
      <MovieList listType="usersSavedMovies" />
    </div>
  );
};

export default SavedMovies;
