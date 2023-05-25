import React, { useState } from 'react';
import { useFullMovies } from '../../hooks';
import { MovieSortOptions } from '../../types';
import Header from '../../components/header';
import MovieList from '../../components/movieList';
import Navbar from '../../components/navbar/Navbar';
import DropdownMenu from '../../components/dropdown';
import styles from './index.module.css';

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
      <div className={styles.listContainer}>
        <DropdownMenu
          sortType={sortType}
          onSortChange={handleSortChange}
          onResetMovies={handleResetMovies}
          isDisabled={isDisabled}
        />
        <MovieList sortType={sortType} listType="databaseMovies" />
      </div>
    </>
  );
};

export default Homepage;
