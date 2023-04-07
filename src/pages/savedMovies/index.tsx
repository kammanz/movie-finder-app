import React, { useState, useCallback, useEffect } from 'react';
import Header from '../../components/header';
import {
  removeFromFirestore,
  updateFireStore,
  sortMovies,
} from '../../utils/utils';
import { MovieSortOptions, Movie } from '../../types';
import { useAuth } from '../../auth/useAuth';
import { getImgUrl } from '../../api';
import { useFullMovies } from '../homepage/hooks';
import DropdownMenu from '../homepage/DropdownMenu';
import Navbar from '../../components/navbar/Navbar';
import styles from '../homepage/MovieList.module.css';

const SavedMovies = () => {
  const [menuSortType, setMenuSortType] = useState<MovieSortOptions>('newest');
  const [savedMoviesError, setSavedMoviesError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { savedMovies, getFirestoreMovies } = useFullMovies();
  const { user } = useAuth();

  useEffect(() => {
    setIsLoading(false);
  }, [savedMovies]);

  const handleRemove = async (movie: Movie) => {
    try {
      setIsLoading(true);
      await removeFromFirestore(movie, user?.email);
      await getFirestoreMovies();
    } catch (error) {
      setSavedMoviesError(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (movie: Movie) => {
    try {
      setIsLoading(true);
      await updateFireStore(movie, user?.email);
      await getFirestoreMovies();
    } catch (error) {
      setSavedMoviesError(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSortChange = (sortType: MovieSortOptions) => {
    setMenuSortType(sortType);
  };

  const initialSavedMovies = useCallback(
    () => savedMovies.filter((movie) => !movie.isWatched),
    [savedMovies]
  );
  const movies: Movie[] | undefined = sortMovies(
    menuSortType,
    initialSavedMovies()
  );

  return (
    <div>
      <Header />
      <Navbar />
      <DropdownMenu
        menuSortType={menuSortType}
        onSortChange={handleSortChange}
        onResetMovies={() => handleSortChange('newest')}
        isDisabled={movies?.length === 0}
      />
      {isLoading && <p>Loading...</p>}
      <ul className={styles.container}>
        {movies &&
          movies.map((movie: Movie) => (
            <li key={movie.id} className={styles.card}>
              <img
                src={getImgUrl(movie.poster_path)}
                alt={`${movie.title} poster`}
              />
              <h6>{movie.title}</h6>
              <p>Released: {movie.release_date}</p>
              <button
                onClick={() => handleUpdate(movie)}
                disabled={movie.isWatched}>
                watched
              </button>
              <button
                disabled={!movie.isAdded}
                onClick={() => handleRemove(movie)}>
                Remove
              </button>
            </li>
          ))}
      </ul>
      {savedMoviesError && <p style={{ color: 'red' }}>{savedMoviesError}</p>}
    </div>
  );
};

export default SavedMovies;
