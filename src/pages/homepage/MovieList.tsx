import React, { useState, useEffect } from 'react';
import { getImgUrl } from '../../api';
import { addToFirestore, removeFromFirestore } from '../../utils/utils';
import { TMovieSortOptions, TuserEmail, TMovie } from '../../types';
import { useFullMovies } from './hooks';
import DropdownMenu from './DropdownMenu';
import styles from './MovieList.module.css';

const MovieList = ({ userEmail }: { userEmail: TuserEmail }) => {
  const [menuSortType, setMenuSortType] = useState<TMovieSortOptions>('newest');
  const [sortedMovies, setSortedMovies] = useState<TMovie[] | undefined>([]);
  const [fullMovies, setFullMovies] = useState<TMovie[] | undefined>([]);
  // const [rawMoviesError, setRawMoviesError] = useState('');
  // const [savedMoviesError, setSavedMoviesError] = useState('');
  const [firebaseError, setFirebaseError] = useState('');
  const {
    moviesToRender: initialFullMovies,
    // rawMovies: initialRawMovies,
    rawMoviesError,
    savedMoviesError,
  } = useFullMovies();

  let movies = fullMovies?.length ? fullMovies : initialFullMovies;

  const handleAddMovie = async (selectedMovie: TMovie) => {
    const updatedMovies = movies?.map((movie) =>
      movie.id === selectedMovie.id ? { ...movie, isAdded: true } : movie
    );

    try {
      await addToFirestore(selectedMovie, userEmail);
      setFullMovies(updatedMovies);
    } catch (firebaseError) {
      setFirebaseError(firebaseError as string);
    }
  };

  const handleRemoveMovie = async (selectedMovie: TMovie) => {
    const updatedMovies = movies?.map((movie) =>
      movie.id === selectedMovie.id ? { ...movie, isAdded: false } : movie
    );

    try {
      await removeFromFirestore(selectedMovie, userEmail);
      setFullMovies(updatedMovies);
    } catch (error) {
      setFirebaseError(error as string);
    }
  };

  const handleResetMovies = () => {
    setSortedMovies(undefined);
    setMenuSortType('newest');
  };

  return (
    <div>
      {/* <DropdownMenu
        menuSortType={menuSortType}
        // onSortChange={handleSortChange}
        onResetMovies={handleResetMovies}
      /> */}
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
      {firebaseError && firebaseError}
    </div>
  );
};

export default MovieList;
