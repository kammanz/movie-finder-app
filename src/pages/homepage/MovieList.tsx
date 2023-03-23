import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { getImgUrl } from '../../api';
import {
  addToFirestore,
  removeFromFirestore,
  updateCachedMovie,
} from '../../utils/utils';
import { TClickType, TuserEmail, TMovie, TMovieList } from '../../types';
import { useAuth } from '../../auth/useAuth';

import styles from './MovieList.module.css';
import { getUsersSavedMovies, useMovies, addSavedMoviesToList } from './hooks';
import { queryKeys } from '../../react-query/constants';

const MovieList = ({ userEmail }: { userEmail: TuserEmail }) => {
  const [fetchNumber, setFetchNumber] = useState(0);
  const queryClient = useQueryClient();
  const { data: movies } = useMovies();
  // console.log('movielist, userEmail: ', userEmail);
  // const userEmail: TuserEmail = localStorage.getItem('user');
  console.log('movielist, userEmail: ', userEmail);

  // const { user } = useAuth();

  // const userEmail = user?.email;

  const handleSuccess = (savedMovies: TMovie[]) => {
    console.log('in handle succes');
    // if (fetchNumber === 0) {
    //   console.log('in handle succes, fetchNumber === 0');
    //   setFetchNumber(1);
    //   refetch();
    // }
    const finalMovies = addSavedMoviesToList(movies, savedMovies);
    queryClient.setQueryData(queryKeys.movies, finalMovies);
  };
  const { data: savedMovies, refetch } = useQuery(
    queryKeys.usersSavedMovies,
    () => getUsersSavedMovies(userEmail),
    {
      enabled: !!movies,
      refetchOnWindowFocus: false,
      // refetchInterval: 5000,
      onSuccess: (savedMovies) => {
        console.log('on success ran');
        console.log('on success ran, movies', movies);
        console.log('on success, savedMovies', savedMovies);
        if (savedMovies.length > 0) {
          handleSuccess(savedMovies);
        }
      },
    }
  );

  useEffect(() => {
    console.log('use effect ran');
    setTimeout(() => refetch(), 2000);
  }, []);

  const handleClick = async (movie: TMovie, clickType: TClickType) => {
    const cachedMovies = queryClient.getQueryData<TMovie[]>('movies');
    let isAdding;

    if (cachedMovies != null) {
      const movieIndexToUpdate = cachedMovies.findIndex(
        ({ id }: TMovie) => id === movie.id
      );

      if (clickType === 'add') {
        addToFirestore(movie, userEmail);
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

      queryClient.setQueryData('movies', updatedCachedMovies);
    }
  };

  return (
    <div>
      <ul className={styles.container}>
        {movies.length > 0 ? (
          movies.map((movie: TMovie) => (
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
