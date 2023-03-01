import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { sortByProperty, newReleases } from '../../utils/utils';
import { TMovie, TMovieSortOptions } from '../../types/types';
import MovieList from './MovieList';
import { fetchAllMovies, fetchUsersSavedMovies } from '../../api';

const List = ({ currentUser }: any) => {
  const [selectedMovieSort, setSelectedMovieSort] =
    useState<TMovieSortOptions>('newest');
  const [sortedMovies, setSortedMovies] = useState<TMovie[] | undefined>();

  const { data: savedMovieIds } = useQuery(
    ['savedMovies'],
    () => fetchUsersSavedMovies(currentUser),
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
    let sorted;
    switch (sortType) {
      case 'oldest':
        sorted = sortByProperty(allMovies, 'release_date', false);
        break;
      case 'newest':
        sorted = sortByProperty(allMovies, 'release_date', true);
        break;
      case 'thirty-days':
        sorted = newReleases(allMovies, 3);
        break;
    }
    setSortedMovies(sorted);
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
      <MovieList movies={sortedMovies || allMovies} />
      <button type="button" onClick={() => setSortedMovies(undefined)}>
        Show all movies
      </button>
    </>
  );
};

export default List;
