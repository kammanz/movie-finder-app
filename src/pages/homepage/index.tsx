import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import {
  addUsersSavedMoviesToList,
  fetchAllMovies,
  fetchUsersSavedMovies,
} from '../../api';
import { useAuth } from '../../context/AuthContext';
import {
  TCurrentUserEmail,
  TMovie,
  TMovieId,
  TMovieSortOptions,
} from '../../types/types';
import { sortMovies } from '../../utils/utils';
import MovieList from './MovieList';
import Header from '../../components/header';

const Homepage = () => {
  const [selectedMovieSort, setSelectedMovieSort] =
    useState<TMovieSortOptions>('newest');
  const [error, setError] = useState('');

  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  let currentUserEmail: TCurrentUserEmail = currentUser?.email;

  const queryClient = useQueryClient();

  const [sortedMovies, setSortedMovies] = useState<TMovie[] | undefined>();

  const movies: TMovie[] | undefined = queryClient.getQueryData('movies');

  useEffect(() => {
    console.log('use effect ran');
    handleUsersSavedMovies();
    return console.log('clean up run');
  }, []);

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
    enabled: currentUserEmail !== undefined,
  });

  console.log('allMovies', allMovies);
  console.log('currentUserEmail', currentUserEmail);

  const handleSort = (sortType: TMovieSortOptions) => {
    setSelectedMovieSort(sortType);
    setSortedMovies(sortMovies(sortType, allMovies));
  };

  // const handleClick = async () => {
  //   setError('');
  //   try {
  //     await logout();
  //     navigate('/login');
  //   } catch (error) {
  //     setError('Failed to log out');
  //   }
  // };

  if (isLoading) return <span>Loading</span>;
  if (isError) return <span>Error</span>;
  if (allMovies === undefined) return <span>Loading</span>;

  return (
    <>
      <Header currentUserEmail={currentUserEmail} />
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
      <MovieList
        movies={sortedMovies || allMovies}
        currentUserEmail={currentUserEmail}
      />
      {/* <button onClick={handleClick}>Logout</button> */}
    </>
  );
};

export default Homepage;
