import React, { useState } from 'react';
import { getImgUrl } from '../../api';
import { sortMovies } from '../../utils/utils';
import { addToFirestore, removeFromFirestore } from '../../utils/utils';
import { useAuth } from '../../auth/useAuth';

import { TMovieSortOptions, TMovie } from '../../types';
import { useFullMovies } from './hooks';
import DropdownMenu from './DropdownMenu';
import styles from './MovieList.module.css';

const MovieList = () => {
  const [menuSortType, setMenuSortType] = useState<TMovieSortOptions>('newest');
  const { moviesToRender, rawMoviesError, savedMoviesError, getFBMovies } =
    useFullMovies();
  const { user } = useAuth();

  const handleSortChange = (sortType: TMovieSortOptions) => {
    setMenuSortType(sortType);
  };

  const handleRemove = async (movie: TMovie) => {
    await removeFromFirestore(movie, user?.email);
    await getFBMovies();
  };

  const handleAdd = async (movie: TMovie) => {
    await addToFirestore(movie, user?.email);
    await getFBMovies();
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
          movies.map((movie: TMovie) => (
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
