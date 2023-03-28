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
  console.log(
    '3.b) Since only sending fullMovies, deleted rawMovies and savedMovies state'
  );
  const [rawMoviesError, setRawMoviesError] = useState('');
  const [savedMoviesError, setSavedMoviesError] = useState('');
  const [firebaseError, setFirebaseError] = useState('');
  const {
    fullMovies: initialFullMovies,
    rawMoviesError: initialRawMoviesError,
    savedMoviesError: initialSavedMoviesError,
  } = useFullMovies();

  useEffect(() => {
    setFullMovies(initialFullMovies);
    setRawMoviesError(initialRawMoviesError);
    setSavedMoviesError(initialSavedMoviesError);
  }, [initialFullMovies, initialRawMoviesError, initialSavedMoviesError]);

  const handleAddMovie = async (selectedMovie: TMovie) => {
    const updatedArray =
      fullMovies &&
      fullMovies.map((movie) => {
        if (movie.id === selectedMovie.id) {
          return { ...movie, isAdded: true };
        } else {
          return movie;
        }
      });

    try {
      await addToFirestore(selectedMovie, userEmail);
      setFullMovies(updatedArray);
    } catch (firebaseError) {
      setFirebaseError(firebaseError as string);
    }
  };

  const handleRemoveMovie = async (selectedMovie: TMovie) => {
    const updatedArray = fullMovies?.map((movie) => {
      if (movie.id === selectedMovie.id) {
        return { ...movie, isAdded: false };
      } else {
        return movie;
      }
    });
    try {
      await removeFromFirestore(selectedMovie, userEmail);
      setFullMovies(updatedArray);
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
        {fullMovies && fullMovies.length > 0 ? (
          fullMovies.map((movie: TMovie) => (
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
