import React, { useState } from 'react';
import { Movie, MovieListProps } from '../../types';
import {
  addToFirestore,
  removeFromFirestore,
  parseFirebaseError,
  sortMovies,
} from '../../utils';
import { useAuth } from '../../auth/useAuth';
import { useFullMovies } from '../../pages/homepage/hooks';
import Card from '../card';
import LoadingOverlay from '../overlay';
import styles from './index.module.css';

const MovieList = ({ sortType, listType }: MovieListProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { getFirestoreMovies, moviesToRender, savedMovies } = useFullMovies();
  const { user } = useAuth();

  const initialMovies =
    listType === 'databaseMovies' ? moviesToRender : savedMovies;

  const handleAdd = async (movie: Movie) => {
    setIsLoading(true);
    try {
      if (user?.uid) {
        await addToFirestore(movie, user.uid);
        await getFirestoreMovies();
      }
    } catch (e) {
      console.error(e);
      e instanceof Error && setError(parseFirebaseError(e));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async (movie: Movie) => {
    setIsLoading(true);
    try {
      await removeFromFirestore(movie, user?.uid);
      await getFirestoreMovies();
    } catch (e) {
      console.error(e);
      e instanceof Error && setError(parseFirebaseError(e));
    } finally {
      setIsLoading(false);
    }
  };

  let sortedMovies = initialMovies && sortMovies(sortType, initialMovies);

  return (
    <>
      <ul className={styles.container}>
        {sortedMovies?.map((movie) => (
          <Card
            key={movie.id}
            movie={movie}
            handleAdd={handleAdd}
            handleRemove={handleRemove}
            listType={listType}
          />
        ))}
      </ul>
      {error && <p>{error}</p>}
      <LoadingOverlay isLoading={isLoading} />
    </>
  );
};

export default MovieList;
