import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import {
  fetchAllMovies,
  fetchUsersSavedMovies,
  addUsersSavedMoviesToList,
} from '../../api';
import {
  TMovie,
  TMovieSortOptions,
  TCurrentUserEmail,
  TMovieId,
} from '../../types/types';
import { sortMovies } from '../../utils/utils';
import MovieList from './MovieList';

const List = ({
  currentUserEmail,
}: {
  currentUserEmail: TCurrentUserEmail;
}) => {
  const [selectedMovieSort, setSelectedMovieSort] =
    useState<TMovieSortOptions>('newest');
  const queryClient = useQueryClient();
  const [sortedMovies, setSortedMovies] = useState<TMovie[] | undefined>();
  const movies: TMovie[] | undefined = queryClient.getQueryData('movies');
  useEffect(() => {
    handleUsersSavedMovies();
  }, [currentUserEmail]);

  const handleUsersSavedMovies = async () => {
    const usersSavedMovies: TMovieId[] = await fetchUsersSavedMovies(
      currentUserEmail
    );

    if (movies !== undefined) {
      const combinedArray = addUsersSavedMoviesToList(movies, usersSavedMovies);
      return queryClient.setQueryData('movies', combinedArray);
    }
  };

  const {
    data: allMovies,
    isLoading,
    isError,
  } = useQuery(['movies'], () => fetchAllMovies(), {
    refetchOnWindowFocus: false,
  });

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
