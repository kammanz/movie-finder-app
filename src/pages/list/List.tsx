import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { collection, doc, setDoc, query, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseSetup';
import { imgUrl, moviesAPI } from '../../api';
import { sortByProperty, newReleases } from '../../utils/utils';
import styles from './List.module.css';

type MovieSortOptions = 'oldest' | 'newest' | 'thirty-days';

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
  const [selectedMovieSort, setSelectedMovieSort] =
    useState<MovieSortOptions>('newest');
  const [sortedMovies, setSortedMovies] = useState<Movie[] | undefined>(); // is this sorted? filtered? or entire list of movies?
  // const queryClient = useQueryClient();

  const { data: savedMovieIds } = useQuery(
    ['savedMovies'],
    () => fetchSavedMovies(currentUser),
    {
      refetchOnWindowFocus: false,
    }
  );

  let usersSavedMovieIds = savedMovieIds;

  // this data is all of your movies
  const {
    data: allMovies,
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
      onSuccess: (data: Movie[]) => setSortedMovies(data), // we don't need this // we now have data + movies to be the same thing
    }
  );

  if (isLoading) return <span>Loading</span>;
  if (isError) return <span>Error</span>;
  if (allMovies === undefined) return <span>Undefined and Loading</span>;

  const handleSort = (sortType: MovieSortOptions) => {
    setSelectedMovieSort(sortType);

    let sorted;

    switch (sortType) {
      case 'oldest':
        sorted = sortByProperty(allMovies, 'release_date', false);
        break;
      case 'newest':
        sorted = sortByProperty(allMovies, 'release_date', true);
        break;
      case 'thirty-days':
        sorted = newReleases(allMovies, 3);
        break;
    }

    setSortedMovies(sorted);
  };

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

  // all MovieList cares about is an array of movies
  const MovieList = ({ movies }: { movies: Movie[] }) => (
    <ul className={styles.listContainer}>
      {movies.length > 0 ? (
        movies.map((movie: Movie) => <Movie key={movie.id} {...movie} />)
      ) : (
        <li>'Your search returned no results'</li>
      )}
    </ul>
  );

  // const a = []; // 0 // this is fine
  // const b = undefined; // doesnt exist

  return (
    <>
      <h1>List page</h1>
      <form>
        <label htmlFor="sort-movies">Sort by:</label>
        <select
          id="sort-movies"
          data-testid="select"
          value={selectedMovieSort}
          onChange={(e) => handleSort(e.target.value as MovieSortOptions)}>
          <option value="newest">newest</option>
          <option value="oldest">oldest</option>
          <option value="thirty-days">last 30 days</option>
        </select>
      </form>
      <MovieList movies={sortedMovies || allMovies} />
      <button type="button" onClick={() => setSortedMovies(undefined)}>
        Show all movies
      </button>
    </>
  );
};

export default List;
