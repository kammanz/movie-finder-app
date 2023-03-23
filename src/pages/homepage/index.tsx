import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'react-query';
import { useAuth } from '../../auth/useAuth';
import { TuserEmail, TMovie, TMovieSortOptions, TMovieId } from '../../types';
import { sortMovies } from '../../utils/utils';
import {
  getMovies,
  useMovies,
  useUsersSavedMovies,
  getUsersSavedMovies,
  addSavedMoviesToList,
} from './hooks';
import Header from '../../components/header';
import MovieList from './MovieList';
import { queryClient } from '../../react-query/queryClient';

const Homepage = () => {
  const [selectedMovieSort, setSelectedMovieSort] =
    useState<TMovieSortOptions>('newest');
  const [sortedMovies, setSortedMovies] = useState<TMovie[] | undefined>();
  const { user } = useAuth();
  let userEmail: TuserEmail = user?.email;
  // const { isLoading, isError, data: allMovies } = useQuery('movies', getMovies);

  // const {
  //   data: allMovies,
  //   isLoading,
  //   isError,
  // } = useQuery('usersSavedMovies', () => getUsersSavedMovies(userEmail), {
  //   // refetchInterval: 5000,
  // });

  // const handleAdd = () => {
  //   const finalMovies = addSavedMoviesToList(allMovies, savedMovies);
  //   queryClient.setQueryData('movies', finalMovies);
  // };

  // useEffect(() => {
  //   handleAdd();
  // }, [savedMovies]);

  // console.log('allMovies: ', allMovies);

  const handleSort = (sortType: TMovieSortOptions) => {
    setSelectedMovieSort(sortType);
  };

  // if (isLoading) return <span>Loading</span>;
  // if (isError) return <span>Error</span>;
  // if (allMovies === undefined) return <span>Loading</span>;

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
      <MovieList userEmail={userEmail} />
    </>
  );
};

export default Homepage;
