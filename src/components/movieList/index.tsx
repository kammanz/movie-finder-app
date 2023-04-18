import React, { useState } from 'react';
import { Movie, MovieSortOptions } from '../../types';
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

const MovieList = ({ sortType }: { sortType: MovieSortOptions }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { getFirestoreMovies, moviesToRender } = useFullMovies();
  const { user } = useAuth();

  const handleAdd = async (movie: Movie) => {
    setIsLoading(true);
    try {
      await addToFirestore(movie, user?.email);
      await getFirestoreMovies();
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
      await removeFromFirestore(movie, user?.email);
      await getFirestoreMovies();
    } catch (e) {
      console.error(e);
      e instanceof Error && setError(parseFirebaseError(e));
    } finally {
      setIsLoading(false);
    }
  };

  let movies = moviesToRender && sortMovies(sortType, moviesToRender);

  return (
    <>
      <ul className={styles.container}>
        {movies?.map((movie) => (
          <Card
            key={movie.id}
            movie={movie}
            handleAdd={handleAdd}
            handleRemove={handleRemove}
          />
        ))}
      </ul>
      {error && <p>{error}</p>}
      <LoadingOverlay isLoading={isLoading} />
    </>
  );
};

export default MovieList;
