import React, { useState } from 'react';
import { getImgUrl } from '../../api';
import { sortMovies } from '../../utils/utils';
import { addToFirestore, removeFromFirestore } from '../../utils/utils';
import { useAuth } from '../../auth/useAuth';

import { MovieSortOptions, Movie } from '../../types';
import { useFullMovies } from './hooks';
import DropdownMenu from './DropdownMenu';
import styles from './MovieList.module.css';

const MovieList = () => {
  const [menuSortType, setMenuSortType] = useState<MovieSortOptions>('newest');
  const {
    moviesToRender,
    rawMoviesError,
    savedMoviesError,
    getFirestoreMovies,
  } = useFullMovies();
  const { user } = useAuth();

  const handleSortChange = (sortType: MovieSortOptions) => {
    setMenuSortType(sortType);
  };

  const handleRemove = async (movie: Movie) => {
    await removeFromFirestore(movie, user?.email);
    await getFirestoreMovies();
  };

  const handleAdd = async (movie: Movie) => {
    await addToFirestore(movie, user?.email);
    await getFirestoreMovies();
  };

  let movies = moviesToRender && sortMovies(menuSortType, moviesToRender);

  return (
    <div>
      <DropdownMenu
        menuSortType={menuSortType}
        onSortChange={handleSortChange}
        onResetMovies={() => handleSortChange('newest')}
      />
      <ul className={styles.container}>
        {movies?.length ? (
          movies.map((movie: Movie) => (
            <li key={movie.id} className={styles.card}>
              <img
                src={getImgUrl(movie.poster_path)}
                alt={`${movie.title} poster`}
              />
              <h6>{movie.title}</h6>
              <p>Released: {movie.release_date}</p>
              <button onClick={() => handleAdd(movie)} disabled={movie.isAdded}>
                Add
              </button>
              <button
                disabled={!movie.isAdded}
                onClick={() => handleRemove(movie)}>
                Remove
              </button>
            </li>
          ))
        ) : (
          <p>'Your search returned no results'</p>
        )}
      </ul>
      {rawMoviesError && <p style={{ color: 'red' }}>{rawMoviesError}</p>}
      {savedMoviesError}
    </div>
  );
};

export default MovieList;
