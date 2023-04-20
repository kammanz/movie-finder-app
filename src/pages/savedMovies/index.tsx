import React, { useState } from 'react';
import { useFullMovies } from '../../hooks';
import { MovieSortOptions } from '../../types';
import Header from '../../components/header';
import MovieList from '../../components/movieList';
import Navbar from '../../components/navbar/Navbar';
import DropdownMenu from '../../components/dropdown';

const SavedMovies = () => {
  const [sortType, setSortType] = useState<MovieSortOptions>('newest');
  const { savedMovies } = useFullMovies();
  const isDisabled = savedMovies?.length === 0;

  const handleSortChange = (sortType: MovieSortOptions) => {
    setSortType(sortType);
  };

  const handleResetMovies = () => {
    setSortType('newest');
  };

  return (
    <>
      <Header />
      <Navbar />
      <DropdownMenu
        sortType={sortType}
        onSortChange={handleSortChange}
        onResetMovies={handleResetMovies}
        isDisabled={isDisabled}
      />
      <MovieList sortType={sortType} listType="usersSavedMovies" />
    </>
  );
};

export default SavedMovies;
