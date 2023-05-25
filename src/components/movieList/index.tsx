import React, { useState, useEffect } from 'react';
import { Movie, MovieListProps } from '../../types';
import {
  addToFirestore,
  removeFromFirestore,
  parseFirebaseError,
  sortMovies,
} from '../../utils';
import { useAuth } from '../../auth/useAuth';
import { useFullMovies } from '../../hooks';
import Card from '../card';
import LoadingOverlay from '../overlay';
import styles from './index.module.css';

const MovieList = ({ sortType, listType }: MovieListProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showIt, setShowIt] = useState(false);
  const {
    getFirestoreMovies,
    moviesToRender,
    savedMovies,
    rawMoviesError,
    savedMoviesError,
  } = useFullMovies();
  const { user } = useAuth();

  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    setRenderCount((renderCount) => renderCount + 1);
    return () => {
      setShowIt(false);
    };
  }, []);

  useEffect(() => {
    setShowIt(true);
  }, [renderCount, moviesToRender, savedMovies]);

  const initialMovies =
    listType === 'databaseMovies' ? moviesToRender : savedMovies;

  let sortedMovies: Movie[] | undefined =
    initialMovies && sortMovies(sortType, initialMovies);

  const handleAdd = async (movie: Movie) => {
    setIsLoading(true);
    try {
      await addToFirestore(movie, user?.uid);
      await getFirestoreMovies();
    } catch (e) {
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
      e instanceof Error && setError(parseFirebaseError(e));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {listType === 'usersSavedMovies' && showIt && savedMovies.length < 1 ? (
        <p>You have no saved movies yet</p>
      ) : null}
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
      {rawMoviesError && <p>{rawMoviesError}</p>}
      {savedMoviesError && <p>{savedMoviesError}</p>}
      <LoadingOverlay isLoading={isLoading} />
    </>
  );
};

export default MovieList;
