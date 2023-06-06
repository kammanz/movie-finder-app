import React, { useState, useMemo } from 'react';
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
import DropdownMenu from '../dropdown';
import LoadingOverlay from '../overlay';
import styles from './index.module.css';
import { MovieSortOptions } from '../../types';

const MovieList = ({ listType }: MovieListProps) => {
  const [sortType, setSortType] = useState<MovieSortOptions>('newest');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    getFirestoreMovies,
    moviesToRender,
    savedMovies,
    rawMoviesError,
    savedMoviesError,
  } = useFullMovies();
  const { user } = useAuth();

  const initialMovies =
    listType === 'databaseMovies' ? moviesToRender : savedMovies;

  const handleSortChange = (sortType: MovieSortOptions) => {
    setSortType(sortType);
  };

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

  const sortedMovies = useMemo(() => {
    if (initialMovies) {
      return sortMovies(sortType, initialMovies);
    }
    return undefined;
  }, [sortType, initialMovies]);

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <p>
          <span>{listType === 'databaseMovies' ? 'Search' : 'Saved'}</span>{' '}
          Movies
        </p>
        <DropdownMenu onSortChange={handleSortChange} />
      </div>
      <ul className={styles.listContainer}>
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
      {sortedMovies?.length === 0 && (
        <p className={styles.listMessage}>
          <i>You have no movies yet</i>
        </p>
      )}
      {error && <p>{error}</p>}
      {rawMoviesError && <p>{rawMoviesError}</p>}
      {savedMoviesError && <p>{savedMoviesError}</p>}
      <LoadingOverlay isLoading={isLoading} />
    </div>
  );
};

export default MovieList;
