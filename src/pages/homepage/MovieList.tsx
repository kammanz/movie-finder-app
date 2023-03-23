import React from 'react';
import { useQueryClient } from 'react-query';
import { getImgUrl } from '../../api';
import {
  addToFirestore,
  removeFromFirestore,
  updateCachedMovie,
} from '../../utils/utils';
import { TClickType, TuserEmail, TMovie, TMovieList } from '../../types';

import styles from './MovieList.module.css';
import { useMovies } from './hooks';

const MovieList = ({ userEmail }: TMovieList) => {
  const queryClient = useQueryClient();
  const { data: movies } = useMovies();

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
