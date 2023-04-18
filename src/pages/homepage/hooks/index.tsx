import { useState, useEffect, useCallback } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseSetup';
import { fullUrl } from '../../../api';
import { UserEmail, Movie } from '../../../types';
import { useAuth } from '../../../auth/useAuth';

export const getRawMovies = async (): Promise<Movie[]> => {
  const { results } = await (await fetch(fullUrl)).json();

  const movies: Movie[] = results.map((movie: Movie) => {
    return { ...movie, isAdded: false, isWatched: false };
  });

  return movies;
};

export const getSavedMovies = async (userEmail: UserEmail) => {
  const usersMoviesRef = await collection(db, `users/${userEmail}/movies`);
  const q = query(usersMoviesRef);
  const querySnapshot = await getDocs(q);
  let savedMovies: Array<Movie> = [];
  querySnapshot.forEach((doc) => {
    const { id, isAdded, poster_path, release_date, title, isWatched } =
      doc.data();
    savedMovies.push({
      id,
      isAdded,
      isWatched,
      poster_path,
      release_date,
      title,
    });
  });

  return savedMovies;
};

export const useFullMovies = () => {
  const [rawMovies, setRawMovies] = useState<Movie[]>([]);
  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);
  const [rawMoviesError, setRawMoviesError] = useState<string>();
  const [savedMoviesError, setSavedMoviesError] = useState<string>();
  const { user } = useAuth();
  const userEmail = user?.email;

  const getFirestoreMovies = useCallback(async () => {
    try {
      console.log('getFirestoreMovies, in try, good');
      const result = await getSavedMovies(userEmail);
      setSavedMovies(result);
    } catch (e) {
      console.log('getFirestoreMovies, in catch, bad');
      console.error(e);
      throw Error;
    }
  }, [userEmail]);

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled
  useEffect(() => {
    getRawMovies()
      .then((rawMovies) => {
        setRawMovies(rawMovies);
      })
      .catch((rawMoviesError: string) => {
        setRawMoviesError(rawMoviesError);
      });
  }, []);

  useEffect(() => {
    getFirestoreMovies();
  }, [getFirestoreMovies]);

  let moviesToRender =
    rawMovies?.length && savedMovies?.length
      ? addSavedMoviesToList(rawMovies, savedMovies)
      : rawMovies;

  return {
    moviesToRender,
    rawMovies,
    rawMoviesError,
    savedMovies,
    savedMoviesError,
    getFirestoreMovies,
  };
};

export const addSavedMoviesToList = (
  rawMovies: Movie[] | undefined,
  usersSavedMovies: Movie[] | undefined
) => {
  if (usersSavedMovies) {
    const moviesWithUsersSelections =
      usersSavedMovies.length > 0
        ? rawMovies?.map((rawMovie) => {
            let isMatched: boolean = usersSavedMovies.some(
              (savedMovie) => savedMovie.id === rawMovie.id
            );
            return { ...rawMovie, isAdded: isMatched };
          })
        : rawMovies;

    return moviesWithUsersSelections;
  }
};
