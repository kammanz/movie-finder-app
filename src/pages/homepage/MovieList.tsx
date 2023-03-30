import React, { useState, useEffect } from 'react';
import { getImgUrl } from '../../api';
import {
  addToFirestore,
  removeFromFirestore,
  sortMovies,
} from '../../utils/utils';
import { TMovieSortOptions, TuserEmail, TMovie } from '../../types';
import { useFullMovies } from './hooks';
import DropdownMenu from './DropdownMenu';
import styles from './MovieList.module.css';

const MovieList = ({ userEmail }: { userEmail: TuserEmail }) => {
  // const [isRefetching, setIsRefetching] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<TMovie | null>(null);
  const [menuSortType, setMenuSortType] = useState<TMovieSortOptions>('newest');
  const [moviesToRender, setMoviesToRender] = useState<TMovie[] | undefined>(
    []
  );
  // const [firebaseError, setFirebaseError] = useState('');
  const {
    moviesToRender: initialMoviesToRender,
    rawMoviesError,
    savedMoviesError,
  } = useFullMovies(selectedMovie);

  let movies = moviesToRender?.length ? moviesToRender : initialMoviesToRender;

  const handleAddMovie = async (selectedMovie: TMovie) => {
    // try {
    //   // await addToFirestore(selectedMovie, userEmail);
    //   // useFullMovies()
    setSelectedMovie(selectedMovie);
    // setIsRefetching(!isRefetching);
    // } catch (firebaseError) {
    //   setFirebaseError(firebaseError as string);
    // }
  };

  const handleRemoveMovie = async (selectedMovie: TMovie) => {
    setSelectedMovie(selectedMovie);
    // try {
    //   await removeFromFirestore(selectedMovie, userEmail);
    //   // setIsRefetching(!isRefetching);
    // } catch (firebaseError) {
    //   setFirebaseError(firebaseError as string);
    // }
  };

  const handleSortChange = (sortType: string) => {
    setMenuSortType(sortType);
    initialMoviesToRender &&
      setMoviesToRender(sortMovies(sortType, initialMoviesToRender));
  };

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
      {/* {firebaseError && firebaseError} */}
    </div>
  );
};

export default MovieList;
