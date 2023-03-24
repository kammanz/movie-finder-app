import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { queryClient } from '../../react-query/queryClient';
import { queryKeys } from '../../react-query/constants';
import { getImgUrl } from '../../api';
import {
  addToFirestore,
  removeFromFirestore,
  sortMovies,
  updateCachedMovie,
} from '../../utils/utils';
import { TClickType, TMovieSortOptions, TuserEmail, TMovie } from '../../types';
import { getUsersSavedMovies, useMovies, addSavedMoviesToList } from './hooks';
import DropdownMenu from './DropdownMenu';
import styles from './MovieList.module.css';

const MovieList = ({ userEmail }: { userEmail: TuserEmail }) => {
  const [menuSortType, setMenuSortType] = useState<TMovieSortOptions>('newest');

  const [sortedMovies, setSortedMovies] = useState<TMovie[] | undefined>();
  const { data: movies, isLoading, isError } = useMovies();

  const { refetch } = useQuery(
    queryKeys.usersSavedMovies,
    () => getUsersSavedMovies(userEmail),
    {
      enabled: !!movies,
      refetchOnWindowFocus: false,
      onSuccess: (savedMovies) => {
        if (savedMovies.length > 0) {
          const updatedMoviesList = addSavedMoviesToList(movies, savedMovies);
          queryClient.setQueryData(queryKeys.movies, updatedMoviesList);
        }
      },
    }
  );

  useEffect(() => {
    setTimeout(() => refetch(), 2000);
  }, [refetch]);

  const handleClick = async (movie: TMovie, clickType: TClickType) => {
    const cachedMovies = queryClient.getQueryData<TMovie[]>(queryKeys.movies);
    let isAdding;

    if (cachedMovies != null) {
      const movieIndexToUpdate = cachedMovies.findIndex(
        ({ id }: TMovie) => id === movie.id
      );

      if (clickType === 'add') {
        await addToFirestore(movie, userEmail);
        isAdding = true;
      } else {
        await removeFromFirestore(movie, userEmail);
        isAdding = false;
      }

      const updatedCachedMovies = updateCachedMovie(
        cachedMovies,
        movieIndexToUpdate,
        isAdding
      );

      queryClient.setQueryData(queryKeys.movies, updatedCachedMovies);
    }
  };

  const allMovies =
    sortedMovies && sortedMovies.length > 0 ? sortedMovies : movies;

  const handleSortChange = (newSortType: TMovieSortOptions) => {
    setMenuSortType(newSortType);
    const sortedList: TMovie[] | undefined = sortMovies(newSortType, movies);
    setSortedMovies(sortedList);
  };

  const handleResetMovies = () => {
    setSortedMovies(undefined);
    setMenuSortType('newest');
  };

  if (isLoading) return <div>Is Loading...</div>;
  if (isError) return <div>Error occurred</div>;

  return (
    <div>
      <DropdownMenu
        menuSortType={menuSortType}
        onSortChange={handleSortChange}
        onResetMovies={handleResetMovies}
      />
      <ul className={styles.container}>
        {allMovies.length > 0 ? (
          allMovies.map((movie: TMovie) => (
            <li key={movie.id} className={styles.card}>
              <img
                src={getImgUrl(movie.poster_path)}
                alt={`${movie.title} poster`}
              />
              <h6>{movie.title}</h6>
              <p>Released: {movie.release_date}</p>
              <button
                onClick={() => handleClick(movie, 'add')}
                disabled={movie.isAdded}>
                Add
              </button>
              <button
                disabled={!movie.isAdded}
                onClick={() => handleClick(movie, 'remove')}>
                Remove
              </button>
            </li>
          ))
        ) : (
          <p>'Your search returned no results'</p>
        )}
      </ul>
    </div>
  );
};

export default MovieList;
