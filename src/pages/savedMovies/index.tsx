import React, { useState } from 'react';
import Header from '../../components/header';
import { useFullMovies } from '../homepage/hooks';
import { removeFromFirestore, updateFireStore } from '../../utils/utils';
import { TMovieSortOptions, TMovie } from '../../types';
import { useAuth } from '../../auth/useAuth';
import { getImgUrl } from '../../api';
import DropdownMenu from '../homepage/DropdownMenu';
import styles from '../homepage/MovieList.module.css';

const SavedMovies = () => {
  const [menuSortType, setMenuSortType] = useState<TMovieSortOptions>('newest');
  const [savedMoviesError, setSavedMoviesError] = useState('');
  const { savedMovies, getFirestoreMovies /*savedMoviesError*/ } =
    useFullMovies();
  const { user } = useAuth();

  const handleRemove = async (movie: TMovie) => {
    try {
      await removeFromFirestore(movie, user?.email);
      await getFirestoreMovies();
    } catch (error) {
      setSavedMoviesError(error as string);
    }
  };

  const handleUpdate = async (movie: TMovie) => {
    try {
      await updateFireStore(movie, user?.email);
      await getFirestoreMovies();
    } catch (error) {
      setSavedMoviesError(error as string);
    }
  };

  const handleSortChange = (sortType: TMovieSortOptions) => {
    setMenuSortType(sortType);
  };

  const movies = savedMovies.filter((movie) => !movie.isWatched);

  return (
    <div>
      <Header />
      SavedMovies
      <DropdownMenu
        menuSortType={menuSortType}
        onSortChange={handleSortChange}
        onResetMovies={() => handleSortChange('newest')}
      />
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
          ))
        ) : (
          <p>'Your list is empty'</p>
        )}
      </ul>
      {savedMoviesError && <p style={{ color: 'red' }}>{savedMoviesError}</p>}
    </div>
  );
};

export default SavedMovies;
