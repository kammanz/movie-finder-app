import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { queryClient } from '../../react-query/queryClient';
import { queryKeys } from '../../react-query/constants';
import { getImgUrl } from '../../api';
import {
  addToFirestore,
  removeFromFirestore,
  sortMovies,
  updateCachedMovie,
} from '../../utils/utils';
import { TClickType, TMovieSortOptions, TuserEmail, TMovie } from '../../types';
import {
  // getUsersSavedMovies,
  useFullMovies,
  addSavedMoviesToList,
} from './hooks';
import DropdownMenu from './DropdownMenu';
import styles from './MovieList.module.css';

/** TODO:
 * How do I make 2 API calls (3rd party + firebase) and merge the results?
 * custom hook?
 * How married to React Query are you? If not, maybe rip it out
 * Create a new git branch just for a custom hook
 * Guides onlien around building a custom hook
 *
 * How have you structured in Firebase?
 * database structure chat
 * look into NoSQL database structure
 */

const MovieList = ({ userEmail }: { userEmail: TuserEmail }) => {
  const [menuSortType, setMenuSortType] = useState<TMovieSortOptions>('newest');
  const [sortedMovies, setSortedMovies] = useState<TMovie[] | undefined>();
  const [movies, setMovies] = useState<TMovie[]>();

  const { fullMovies, error } = useFullMovies(); // 3rd party movies // 1st

  // const handleClick = async (movie: TMovie, clickType: TClickType) => {
  //   const movieIndexToUpdate = cachedMovies.find(
  //     ({ id }: TMovie) => id === movie.id
  //   );

  //   await addToFirestore(movie, userEmail);

  //   await removeFromFirestore(movie, userEmail);

  //   const updatedCachedMovies = updateCachedMovie(
  //     cachedMovies,
  //     movieIndexToUpdate,
  //     isAdding
  //   );

  //   queryClient.setQueryData(queryKeys.movies, updatedCachedMovies);
  // };

  const allMovies =
    sortedMovies && sortedMovies.length > 0 ? sortedMovies : movies;

  const handleSortChange = (newSortType: TMovieSortOptions) => {
    setMenuSortType(newSortType);
    const sortedList: TMovie[] | undefined = sortMovies(
      newSortType,
      fullMovies
    );
    setSortedMovies(sortedList);
  };

  const handleResetMovies = () => {
    setSortedMovies(undefined);
    setMenuSortType('newest');
  };

  // if (isLoading) return <div>Is Loading...</div>;
  // if (isError) return <div>Error occurred</div>;

  return (
    <div>
      <DropdownMenu
        menuSortType={menuSortType}
        onSortChange={handleSortChange}
        onResetMovies={handleResetMovies}
      />
      <ul className={styles.container}>
        {fullMovies.length > 0 ? (
          fullMovies.map((movie: TMovie) => (
            <li key={movie.id} className={styles.card}>
              <img
                src={getImgUrl(movie.poster_path)}
                alt={`${movie.title} poster`}
              />
              <h6>{movie.title}</h6>
              <p>Released: {movie.release_date}</p>
              <button
                // onClick={() => handleClick(movie, 'add')}
                disabled={movie.isAdded}>
                Add
              </button>
              <button
                disabled={!movie.isAdded}
                // onClick={() => handleClick(movie, 'remove')}
              >
                Remove
              </button>
            </li>
          ))
        ) : (
          <p>'Your search returned no results'</p>
        )}
      </ul>
    </div>
  );
};

export default MovieList;
