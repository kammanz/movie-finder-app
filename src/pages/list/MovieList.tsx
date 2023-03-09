import React from 'react';
import { useQueryClient } from 'react-query';
import { imgUrl } from '../../api';
import {
  addToFirestore,
  removeFromFirestore,
  updateCachedMovie,
} from '../../utils/utils';
import {
  TClickType,
  TCurrentUserEmail,
  TMovie,
  TMovieList,
} from '../../types/types';

import styles from './MovieList.module.css';

const Movie = (movie: TMovie, currentUserEmail: TCurrentUserEmail) => {
  const queryClient = useQueryClient();

  const handleClick = async (clickType: TClickType) => {
    const cachedMovies = queryClient.getQueryData<TMovie[]>('movies');
    let isAdding;

    if (cachedMovies != null) {
      const movieIndexToUpdate = cachedMovies.findIndex(
        (item: TMovie) => item.id === movie.id
      );

      if (clickType === 'add') {
        addToFirestore(movie, currentUserEmail);
        isAdding = true;
      } else {
        await removeFromFirestore(movie, currentUserEmail);
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
    <li key={movie.id} className={styles.card}>
      <img src={imgUrl(movie.poster_path)} alt={`${movie.title} poster`} />
      <h6>{movie.title}</h6>
      <p>Released: {movie.release_date}</p>
      <button onClick={() => handleClick('add')} disabled={movie.isAdded}>
        Add
      </button>
      <button disabled={!movie.isAdded} onClick={() => handleClick('remove')}>
        Remove
      </button>
    </li>
  );
};

const MovieList = ({ movies, currentUserEmail }: TMovieList) => {
  return (
    <ul className={styles.container}>
      {movies.length > 0 ? (
        movies.map((movie) => Movie(movie, currentUserEmail))
      ) : (
        <p>'Your search returned no results'</p>
      )}
    </ul>
  );
};

export default MovieList;
