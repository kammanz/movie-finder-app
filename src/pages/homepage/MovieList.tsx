import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { queryClient } from '../../react-query/queryClient';
import { queryKeys } from '../../react-query/constants';
// import { fullUrl } from '../../../api';
import { getImgUrl, fullUrl } from '../../api';
import {
  addToFirestore,
  removeFromFirestore,
  sortMovies,
  updateCachedMovie,
} from '../../utils/utils';
import { TClickType, TMovieSortOptions, TuserEmail, TMovie } from '../../types';
import { db } from '../../firebase/firebaseSetup';

import {
  // getUsersSavedMovies,
  useFullMovies,
  addSavedMoviesToList,
  getRawMovies,
  getSavedMovies,
} from './hooks';
import { collection, query, getDocs } from 'firebase/firestore';
// import { db } from '../../../firebase/firebaseSetup';
// import { fullUrl } from '../../../api';
// import { TuserEmail, TMovie } from '../../../types';
import DropdownMenu from './DropdownMenu';
import styles from './MovieList.module.css';

const MovieList = ({ userEmail }: { userEmail: TuserEmail }) => {
  const [menuSortType, setMenuSortType] = useState<TMovieSortOptions>('newest');
  const [sortedMovies, setSortedMovies] = useState<TMovie[] | undefined>([]);
  const [rawMovies, setRawMovies] = useState<TMovie[] | undefined>([]);
  const [savedMovies, setSavedMovies] = useState<TMovie[] | undefined>([]);
  const [fullMovies, setFullMovies] = useState<TMovie[] | undefined>([]);
  const [rawMoviesError, setRawMoviesError] = useState('');
  const [savedMoviesError, setSavedMoviesError] = useState('');
  const [error, setError] = useState('');
  const {
    fullMovies: initialFullMovies,
    rawMoviesError: initialRawMoviesError,
    savedMoviesError: initialSavedMoviesError,
  } = useFullMovies();

  useEffect(() => {
    console.log('movielist, useeffect');
    // handleGetRawMovies();
    // handleGetSavedMovies();
    if (initialFullMovies) {
      console.log(
        'movielist, useeffect, initialFullMovies: ',
        initialFullMovies
      );
      setFullMovies(initialFullMovies);
    }
    if (initialRawMoviesError) {
      setRawMoviesError(initialRawMoviesError);
    }
    if (initialSavedMoviesError) {
      setSavedMoviesError(initialSavedMoviesError);
    }
  }, [initialFullMovies, initialRawMoviesError, initialSavedMoviesError]);

  // useEffect(() => {
  //   if (rawMovies && savedMovies) {
  //     const fullishMovies = addSavedMoviesToList(rawMovies, savedMovies);

  //     setFullMovies(fullishMovies);
  //   }
  // }, [rawMovies, savedMovies]);

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
    } catch (error) {
      setError(error as string);
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
      setError(error as string);
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
    </div>
  );
};

export default MovieList;
