import React, { useEffect, useState } from 'react';
import { useAuth } from '../../auth/useAuth';
import { queryClient } from '../../react-query/queryClient';
import { TuserEmail, TMovie, TMovieId, TMovieSortOptions } from '../../types';
import { sortMovies } from '../../utils/utils';
import {
  addSavedMoviesToList,
  getUsersSavedMovies,
  useMovies,
  useUsersSavedMovies,
} from './hooks';
import Header from '../../components/header';
import MovieList from './MovieList';

const Homepage = () => {
  const [selectedMovieSort, setSelectedMovieSort] =
    useState<TMovieSortOptions>('newest');
  const [sortedMovies, setSortedMovies] = useState<TMovie[] | undefined>();
  const { user } = useAuth();
  let userEmail: TuserEmail = user?.email;

  const movies: TMovie[] | undefined = queryClient.getQueryData('movies');

  const savedMovies = () => {
    getUsersSavedMovies(user?.email);
  };

  useEffect(() => {
    getUsersSavedMovies(user?.email);
    // if (user) {
    //   savedMovies();
    // }
    // console.log('use effect ran');
    // handleUsersSavedMovies();
    // return console.log('clean up run');
  }, []);

  const handleUsersSavedMovies = async () => {
    const usersSavedMovies: TMovieId[] = await getUsersSavedMovies(userEmail);

    if (movies !== undefined) {
      const combinedArray = addSavedMoviesToList(movies, usersSavedMovies);
      return queryClient.setQueryData('movies', combinedArray);
    }
  };

  const { data: allMovies, isLoading, isError } = useMovies();
  const { data: usersSavedMovies } = useUsersSavedMovies(userEmail);
  console.log('usersSavedMovies: ', usersSavedMovies);

  // console.log('allMovies', allMovies);
  // console.log('userEmail', userEmail);

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
