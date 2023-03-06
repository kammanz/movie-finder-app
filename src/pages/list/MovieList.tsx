import React from 'react';
import { getAuth } from 'firebase/auth';
import { imgUrl } from '../../api';
import { addMovie } from '../../utils/utils';
import {
  TMovie,
  TMovieList,
  THandleAddMovie,
  ICurrentUserEmail,
} from '../../types/types';
import { useQueryClient } from 'react-query';
import styles from './MovieList.module.css';

// const auth = getAuth();
// const currentUserEmail: ICurrentUserEmail = auth.currentUser?.email;

const Movie = (movie: TMovie, currentUserEmail: ICurrentUserEmail) => {
  const queryClient = useQueryClient();

  const handleAddMovie = ({ movie, currentUserEmail }: THandleAddMovie) => {
    console.log('in MovieList, currentUserEmail: ', currentUserEmail);
    addMovie(movie, currentUserEmail);
    const currentData = queryClient.getQueryData<TMovie[]>('movies');

    if (currentData != null) {
      const indexToUpdate = currentData.findIndex(
        (item: TMovie) => item.id === movie.id
      );

      const updatedData = [
        ...currentData.slice(0, indexToUpdate),
        { ...movie, isAdded: true },
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
      <button disabled={!movie.isAdded}>Remove</button>
    </li>
  );
};

const MovieList = ({ movies, currentUserEmail }: TMovieList) => (
  <ul className={styles.container}>
    {movies.length > 0 ? (
      movies.map((movie) => (
        <div key={movie.id}>
          {/* <Movie movie={movie} currentUserEmail={currentUserEmail} /> */}
          {Movie(movie, currentUserEmail)}
        </div>
      ))
    ) : (
      <li>'Your search returned no results'</li>
    )}
  </ul>
);

export default MovieList;
