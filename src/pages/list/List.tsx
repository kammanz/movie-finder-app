import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchAllMovies, fetchUsersSavedMovies } from '../../api';
import {
  TMovie,
  TMovieSortOptions,
  ICurrentUserEmail,
} from '../../types/types';
import { sortMovies } from '../../utils/utils';
import MovieList from './MovieList';

const List = (currentUserEmail: ICurrentUserEmail) => {
  const [selectedMovieSort, setSelectedMovieSort] =
    useState<TMovieSortOptions>('newest');
  const [sortedMovies, setSortedMovies] = useState<TMovie[] | undefined>();

  const { data: savedMovieIds } = useQuery(
    ['savedMovies'],
    () => fetchUsersSavedMovies(currentUserEmail),
    {
      refetchOnWindowFocus: false,
    }
  );

  let usersSavedMovieIds = savedMovieIds;

  const {
    data: allMovies,
    isLoading,
    isError,
  } = useQuery(
    ['movies'],
    () => usersSavedMovieIds && fetchAllMovies(usersSavedMovieIds),
    {
      enabled: !!usersSavedMovieIds,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );

  if (isLoading) return <span>Loading</span>;
  if (isError) return <span>Error</span>;
  if (allMovies === undefined) return <span>Loading</span>;

  const handleSort = (sortType: TMovieSortOptions) => {
    setSelectedMovieSort(sortType);
    setSortedMovies(sortMovies(sortType, allMovies));
  };

  return (
    <>
      <h1>List page</h1>
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
      <MovieList
        movies={sortedMovies || allMovies}
        currentUserEmail={currentUserEmail}
      />
      <button type="button" onClick={() => setSortedMovies(undefined)}>
        Show all movies
      </button>
    </>
  );
};

export default List;
