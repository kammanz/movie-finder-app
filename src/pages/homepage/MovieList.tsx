import React, { useState } from 'react';
import { getImgUrl } from '../../api';
import { sortMovies } from '../../utils/utils';
import { TMovieSortOptions, TuserEmail, TMovie } from '../../types';
import { useFullMovies } from './hooks';
import DropdownMenu from './DropdownMenu';
import styles from './MovieList.module.css';

const MovieList = ({ userEmail }: { userEmail: TuserEmail }) => {
  const [selectedMovie, setSelectedMovie] = useState<TMovie | null>(null);
  const [menuSortType, setMenuSortType] = useState<TMovieSortOptions>('newest');
  const {
    moviesToRender: initialMoviesToRender,
    rawMoviesError,
    savedMoviesError,
  } = useFullMovies(selectedMovie);

  const handleAddMovie = (selectedMovie: TMovie) => {
    setSelectedMovie(selectedMovie);
  };

  const handleRemoveMovie = (selectedMovie: TMovie) => {
    setSelectedMovie(selectedMovie);
  };

  const handleSortChange = (sortType: string) => {
    setMenuSortType(sortType);
  };

  let movies =
    initialMoviesToRender && sortMovies(menuSortType, initialMoviesToRender);

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
              <button
                onClick={() => handleAddMovie(movie)}
                disabled={movie.isAdded}>
                Add
              </button>
              <button
                disabled={!movie.isAdded}
                onClick={() => handleRemoveMovie(movie)}>
                Remove
              </button>
            </li>
          ))
        ) : (
          <p>'Your search returned no results'</p>
        )}
      </ul>
      {rawMoviesError && rawMoviesError}
      {savedMoviesError && savedMoviesError}
    </div>
  );
};

export default MovieList;
