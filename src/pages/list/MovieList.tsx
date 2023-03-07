import React from 'react';
import { imgUrl } from '../../api';
import { addMovie, deleteMovie } from '../../utils/utils';
import { TMovie, TCurrentUserEmail } from '../../types/types';
import { useQueryClient } from 'react-query';
import styles from './MovieList.module.css';

const Movie = (movie: TMovie, currentUserEmail: TCurrentUserEmail) => {
  const queryClient = useQueryClient();

  const handleAddMovie = ({ movie, currentUserEmail }: any) => {
    addMovie(movie, currentUserEmail);
    const currentData = queryClient.getQueryData<TMovie[]>('movies');

    if (currentData != null) {
      const indexToUpdate = currentData.findIndex(
        (item: TMovie) => item.id === movie.id
      );

      const updatedData: TMovie[] = [
        ...currentData.slice(0, indexToUpdate),
        { ...movie, isAdded: true },
        ...currentData.slice(indexToUpdate + 1),
      ];

      queryClient.setQueryData('movies', updatedData);
    }
  };

  const handleDeleteMovie = ({ movie, currentUserEmail }: any) => {
    deleteMovie(movie, currentUserEmail);
    console.log('in delete movie, movie.id: ', movie.id);
    const currentData = queryClient.getQueryData<TMovie[]>('movies');

    if (currentData != null) {
      const indexToUpdate = currentData.findIndex(
        (item: TMovie) => item.id === movie.id
      );

      const updatedData = [
        ...currentData.slice(0, indexToUpdate),
        { ...movie, isAdded: false },
        ...currentData.slice(indexToUpdate + 1),
      ];

      queryClient.setQueryData('movies', updatedData);
    }
  };

  return (
    <li className={styles.card}>
      <img src={imgUrl(movie.poster_path)} alt={`${movie.title} poster`} />
      <h6>{movie.title}</h6>
      <p>Released: {movie.release_date}</p>
      <button
        onClick={() => handleAddMovie({ movie, currentUserEmail })}
        disabled={movie.isAdded}>
        Add
      </button>
      <button
        disabled={!movie.isAdded}
        onClick={() => handleDeleteMovie({ movie, currentUserEmail })}>
        Remove
      </button>
    </li>
  );
};

type TMovieList = {
  movies: TMovie[];
  currentUserEmail: TCurrentUserEmail;
};

const MovieList = ({ movies, currentUserEmail }: TMovieList) => {
  return (
    <ul className={styles.container}>
      {movies.length > 0 ? (
        movies.map((movie) => (
          <div key={movie.id}>{Movie(movie, currentUserEmail)}</div>
        ))
      ) : (
        <li>'Your search returned no results'</li>
      )}
    </ul>
  );
};

export default MovieList;
