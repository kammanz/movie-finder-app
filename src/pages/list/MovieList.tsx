import React from 'react';
import { useQueryClient } from 'react-query';
import { imgUrl } from '../../api';
import { addMovie, deleteMovie } from '../../utils/utils';
import { TMovieList, TMovie, TCurrentUserEmail } from '../../types/types';

import styles from './MovieList.module.css';

const Movie = (movie: TMovie, currentUserEmail: TCurrentUserEmail) => {
  const queryClient = useQueryClient();

  const handleAddMovie = ({ movie, currentUserEmail }: any) => {
    addMovie(movie, currentUserEmail);
    const cachedMovies = queryClient.getQueryData<TMovie[]>('movies');

    function modifyArrayElement2(
      array: TMovie[],
      index: number,
      newValue: boolean
    ) {
      if (index >= array.length || index < 0) {
        throw new Error('Invalid index');
      }

      const updatedArray: TMovie[] = [...array]; // create a new array to avoid mutating the original array
      updatedArray[index].isAdded = newValue; // modify the element at the specified index
      // return newArray; // return the modified array

      return queryClient.setQueryData('movies', updatedArray);
    }

    if (cachedMovies != null) {
      // the target
      const indexToUpdate = cachedMovies.findIndex(
        (item: TMovie) => item.id === movie.id
      );

      modifyArrayElement2(cachedMovies, indexToUpdate, true);

      // const updatedData: TMovie[] = [
      //   ...cachedMovies.slice(0, indexToUpdate),
      //   { ...movie, isAdded: true },
      //   ...cachedMovies.slice(indexToUpdate + 1),
      // ];

      // queryClient.setQueryData('movies', updatedData);
    }
  };

  const handleDeleteMovie = async ({ movie, currentUserEmail }: any) => {
    await deleteMovie(movie, currentUserEmail);
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
    <li key={movie.id} className={styles.card}>
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
