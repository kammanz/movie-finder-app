import React, { useState } from 'react';
import { useAuth } from '../../auth/useAuth';
import { TuserEmail, TMovie, TMovieSortOptions } from '../../types';
import { sortMovies } from '../../utils/utils';
import { useMovies, useUsersSavedMovies } from './hooks';
import Header from '../../components/header';
import MovieList from './MovieList';

const Homepage = () => {
  const [selectedMovieSort, setSelectedMovieSort] =
    useState<TMovieSortOptions>('newest');
  const [sortedMovies, setSortedMovies] = useState<TMovie[] | undefined>();
  const { user } = useAuth();
  let userEmail: TuserEmail = user?.email;
  const { data: allMovies, isLoading, isError } = useMovies();
  const { data: usersSavedMovies } = useUsersSavedMovies(userEmail);

  console.log('usersSavedMovies', usersSavedMovies);

  console.log('allMovies: ', allMovies);

  const handleSort = (sortType: TMovieSortOptions) => {
    setSelectedMovieSort(sortType);
    setSortedMovies(sortMovies(sortType, allMovies));
  };

  if (isLoading) return <span>Loading</span>;
  if (isError) return <span>Error</span>;
  if (allMovies === undefined) return <span>Loading</span>;

  return (
    <>
      <Header userEmail={userEmail} />
      <div>{user?.uid}</div>
      <div>
        <form>
          <label htmlFor="sort-movies">Sort by:</label>
          <select
            id="sort-movies"
            data-testid="select"
            value={selectedMovieSort}
            onChange={(e) => handleSort(e.target.value as TMovieSortOptions)}>
            <option value="newest">newest</option>
            <option value="oldest">oldest</option>
            <option value="thirty-days">last 30 days</option>
          </select>
        </form>
        <button type="button" onClick={() => setSortedMovies(undefined)}>
          Show all movies
        </button>
      </div>
      <MovieList movies={sortedMovies || allMovies} userEmail={userEmail} />
    </>
  );
};

export default Homepage;
