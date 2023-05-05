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
    // This code will run after every re-render of the component
    console.log('Component has re-rendered');
    // Increase the render count
    setRenderCount((renderCount) => renderCount + 1);
    return () => {
      setShowIt(false); // Cancels any pending state changes to showIt
    };
  }, []);

  useEffect(() => {
    // This code will only run after the component has finished all of its re-renders
    console.log('Component has finished re-rendering');
    setShowIt(true);
    // This function will run when the component is unmounted
    // return () => {
    //   console.log('Component is unmounting');
    // };
  }, [renderCount, moviesToRender, savedMovies]);

  console.log('moviesToRender: ', moviesToRender);
  console.log('savedMovies: ', savedMovies);

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

  console.log('sortedMovies: ', sortedMovies);

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
