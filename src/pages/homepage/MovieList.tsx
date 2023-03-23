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

// const Movie = (movie: TMovie, userEmail: TuserEmail) => {
//   // const queryClient = useQueryClient();

//   const handleClick = async (clickType: TClickType) => {
//     const cachedMovies = queryClient.getQueryData<TMovie[]>('movies');
//     let isAdding;

//     if (cachedMovies != null) {
//       const movieIndexToUpdate = cachedMovies.findIndex(
//         ({ id }: TMovie) => id === movie.id
//       );

//       if (clickType === 'add') {
//         addToFirestore(movie, userEmail);
//         isAdding = true;
//       } else {
//         await removeFromFirestore(movie, userEmail);
//         isAdding = false;
//       }

//       const updatedCachedMovies = updateCachedMovie(
//         cachedMovies,
//         movieIndexToUpdate,
//         isAdding
//       );

//       queryClient.setQueryData('movies', updatedCachedMovies);
//     }
//   };

//   return (
//     <li key={movie.id} className={styles.card}>
//       <img src={getImgUrl(movie.poster_path)} alt={`${movie.title} poster`} />
//       <h6>{movie.title}</h6>
//       <p>Released: {movie.release_date}</p>
//       <button onClick={() => handleClick('add')} disabled={movie.isAdded}>
//         Add
//       </button>
//       <button disabled={!movie.isAdded} onClick={() => handleClick('remove')}>
//         Remove
//       </button>
//     </li>
//   );
// };

const MovieList = ({ movies, userEmail }: TMovieList) => {
  const queryClient = useQueryClient();

  const Movie = (movie: TMovie, userEmail: TuserEmail) => {
    // const queryClient = useQueryClient();

    const handleClick = async (clickType: TClickType) => {
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
      <li key={movie.id} className={styles.card}>
        <img src={getImgUrl(movie.poster_path)} alt={`${movie.title} poster`} />
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

  return (
    <div>
      <ul className={styles.container}>
        {movies.length > 0 ? (
          movies.map((movie) => Movie(movie, userEmail))
        ) : (
          <p>'Your search returned no results'</p>
        )}
      </ul>
    </div>
  );
};

export default MovieList;
