import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { collection, doc, setDoc, query, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseSetup';
import { imgUrl, moviesAPI } from '../../api';
import { sortByProperty, newReleases } from '../../utils/utils';
import styles from './List.module.css';

export type Movie = {
  id: number;
  poster_path: string;
  release_date: string;
  title: string;
  isAdded: boolean;
};

export type MovieId = {
  id: number;
};

const addSavedMovies = (
  movies: Array<Movie>,
  usersSavedMovieIds: Array<MovieId>
) => {
  const newArray = movies.map((movie) => {
    const match = usersSavedMovieIds.find(
      (savedMovieId) => movie.id === savedMovieId.id
    );
    if (match) {
      return { ...movie, isAdded: true };
    } else {
      return { ...movie, isAdded: false };
    }
  });

  return newArray;
};

export const fetchMovies = async (usersSavedMovieIds: Array<MovieId>) => {
  try {
    const { results: movies } = await (await fetch(moviesAPI)).json();
    return addSavedMovies(movies, usersSavedMovieIds);
  } catch (error) {
    throw new Error(typeof error);
  }
};

const fetchSavedMovies = async (currentUser: string) => {
  try {
    const usersMoviesRef = collection(db, `users/${currentUser}/movies`);
    const q = query(usersMoviesRef);
    const querySnapshot = await getDocs(q);
    let movieIds: Array<MovieId> = [];
    querySnapshot.forEach((doc) => {
      doc.id && movieIds.push({ id: parseInt(doc.id) });
    });

    return movieIds;
  } catch (error) {
    throw error;
  }
};

const List = ({ currentUser }: any) => {
  const [selectedMovieSort, setSelectedMovieSort] = useState('newest');
  const [movies2, setMovies2] = useState<Movie[]>([]);

  const queryClient = useQueryClient();

  const handleSort = (sortType: string) => {
    setSelectedMovieSort(sortType);
    let data: unknown = queryClient.getQueryData('movies');
    const cachedMovies = data as Array<Movie>;

    switch (sortType) {
      case 'oldest':
        const sortedByOldest = sortByProperty(
          [...cachedMovies],
          'release_date',
          false
        );
        return setMovies2(sortedByOldest);
      case 'newest':
        const sortedByNewest = sortByProperty(
          [...cachedMovies],
          'release_date',
          true
        );
        return setMovies2(sortedByNewest);
      case 'thirty-days':
        const sortedByRecent: any = newReleases([...cachedMovies], 3);
        return setMovies2(sortedByRecent);
      default:
        return;
    }
  };

  const { data: savedMovieIds } = useQuery(
    ['savedMovies'],
    () => fetchSavedMovies(currentUser),
    {
      refetchOnWindowFocus: false,
    }
  );

  let usersSavedMovieIds = savedMovieIds;

  const {
    data: movies,
    isLoading,
    isError,
  } = useQuery(
    ['movies'],
    () => usersSavedMovieIds && fetchMovies(usersSavedMovieIds),
    {
      enabled: !!usersSavedMovieIds,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      onSuccess: (movies: Movie[]) => setMovies2(movies),
    }
  );

  if (isLoading) return <span>Loading</span>;
  if (isError) return <span>Error</span>;
  if (movies === undefined) return <span>Undefined and Loading</span>;

  const addMovie = async (movie: Movie) => {
    try {
      await setDoc(doc(db, `users/${currentUser}/movies/${movie.id}`), {
        id: movie.id,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        title: movie.title,
        isAdded: true,
      });
      // TODO: query the database by movie id, find the movie, update its isAdded property
      // page should rerender because cache has been updated
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const deleteMovie = () => {
    console.log('deleteMovie ran');
  };

  const Movie = (movie: Movie) => (
    <li className={styles.card}>
      <img src={imgUrl(movie.poster_path)} alt={`${movie.title} poster`} />
      <h6>{movie.title}</h6>
      <p>Released: {movie.release_date}</p>
      <button onClick={() => addMovie(movie)} disabled={movie.isAdded}>
        Add
      </button>
      <button onClick={() => deleteMovie()} disabled={!movie.isAdded}>
        Remove
      </button>
    </li>
  );

  const MovieList = () => (
    <ul className={styles.listContainer}>
      {movies2.length ? (
        movies2.map((movie: Movie) => <Movie key={movie.id} {...movie} />)
      ) : (
        <li>'Your search returned no results'</li>
      )}
    </ul>
  );

  return (
    <>
      <h1>List page</h1>
      <form>
        <label htmlFor="sort-movies">Sort by:</label>
        <select
          id="sort-movies"
          data-testid="select"
          value={selectedMovieSort}
          onChange={(e) => handleSort(e.target.value)}>
          <option value="newest">newest</option>
          <option value="oldest">oldest</option>
          <option value="thirty-days">last 30 days</option>
        </select>
      </form>
      <MovieList />
    </>
  );
};

export default List;
