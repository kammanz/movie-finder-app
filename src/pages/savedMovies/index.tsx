import React, { useState } from 'react';
import Header from '../../components/header';
import { useFullMovies } from '../homepage/hooks';
import { addToFirestore, removeFromFirestore } from '../../utils/utils';
import { TMovieSortOptions, TMovie } from '../../types';
import { useAuth } from '../../auth/useAuth';
import { getImgUrl } from '../../api';
import DropdownMenu from '../homepage/DropdownMenu';
import styles from '../homepage/MovieList.module.css';

const SavedMovies = () => {
  // import the hook with saved movies
  const [menuSortType, setMenuSortType] = useState<TMovieSortOptions>('newest');

  const { savedMovies, getFirestoreMovies } = useFullMovies();
  const { user } = useAuth();

  const handleRemove = async (movie: TMovie) => {
    await removeFromFirestore(movie, user?.email);
    await getFirestoreMovies();
  };

  const handleAdd = async (movie: TMovie) => {
    await addToFirestore(movie, user?.email);
    await getFirestoreMovies();
  };

  const handleSortChange = (sortType: TMovieSortOptions) => {
    setMenuSortType(sortType);
  };

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
        {savedMovies?.length ? (
          savedMovies.map((movie: TMovie) => (
            <li key={movie.id} className={styles.card}>
              <img
                src={getImgUrl(movie.poster_path)}
                alt={`${movie.title} poster`}
              />
              <h6>{movie.title}</h6>
              <p>Released: {movie.release_date}</p>
              <button onClick={() => handleAdd(movie)} disabled={movie.isAdded}>
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
    </div>
  );
};

export default SavedMovies;
