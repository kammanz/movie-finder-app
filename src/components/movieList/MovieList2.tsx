import React, { useState } from 'react';
import { Movie } from '../../types';
import {
  addToFirestore,
  removeFromFirestore,
  parseFirebaseError,
} from '../../utils';
import { useAuth } from '../../auth/useAuth';
import { useFullMovies } from '../../pages/homepage/hooks';

import Card from '../card';
import styles from './MovieList.module.css';

const MovieList = () => {
  const [error, setError] = useState('');

  const { moviesToRender, getFirestoreMovies } = useFullMovies();
  const { user } = useAuth();

  const handleAdd = async (movie: Movie) => {
    try {
      await addToFirestore(movie, user?.email);
      await getFirestoreMovies();
    } catch (e) {
      e instanceof Error && setError(parseFirebaseError(e));
    }
  };

  const handleRemove = async (movie: Movie) => {
    try {
      await removeFromFirestore(movie, user?.email);
      await getFirestoreMovies();
    } catch (e) {
      e instanceof Error && setError(parseFirebaseError(e));
    }
  };

  let movies = moviesToRender;

  return (
    <>
      {error && <p>{error}</p>}
      <ul className={styles.container}>
        {movies?.map((movie) => (
          <Card
            movie={movie}
            handleAdd={handleAdd}
            handleRemove={handleRemove}
          />
        ))}
      </ul>
    </>
  );
};

export default MovieList;
