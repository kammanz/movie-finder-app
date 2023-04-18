import React, { useState } from 'react';
import { useFullMovies } from '../../pages/homepage/hooks';
import { MovieSortOptions } from '../../types';
import Header from '../../components/header';
import MovieList from '../../components/movieList/MovieList2';
import Navbar from '../../components/navbar/Navbar';
import DropdownMenu from './DropdownMenu';

const Homepage = () => {
  const [sortType, setSortType] = useState<MovieSortOptions>('newest');
  const { moviesToRender } = useFullMovies();
  const isDisabled = moviesToRender?.length === 0;

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
        onSortChange={() => setSortType(sortType)}
        onResetMovies={() => setSortType('newest')}
        isDisabled={isDisabled}
      />
      <MovieList sortType={sortType} />
    </>
  );
};

export default Homepage;
