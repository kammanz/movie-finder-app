import { useState, useEffect, useCallback } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseSetup';
import { fullUrl } from '../../../api';
import { TuserEmail, TMovie } from '../../../types';
import { useAuth } from '../../../auth/useAuth';

export const getRawMovies = async (): Promise<TMovie[]> => {
  const { results } = await (await fetch(fullUrl)).json();

  const movies: TMovie[] = results.map((movie: TMovie) => {
    return { ...movie, isAdded: false, isWatched: false };
  });

  return movies;
};

export const getSavedMovies = async (userEmail: TuserEmail) => {
  const usersMoviesRef = await collection(db, `users/${userEmail}/movies`);
  const q = query(usersMoviesRef);
  const querySnapshot = await getDocs(q);
  let savedMovies: Array<TMovie> = [];
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
  const [rawMovies, setRawMovies] = useState<TMovie[]>([]);
  const [savedMovies, setSavedMovies] = useState<TMovie[]>([]);
  const [rawMoviesError, setRawMoviesError] = useState<string>();
  const [savedMoviesError, setSavedMoviesError] = useState<string>();
  const { user } = useAuth();
  const userEmail = user?.email;

  const getFirestoreMovies = useCallback(async () => {
    getSavedMovies(userEmail) // 'dan.page@gmail.com'
      .then((savedMovies) => {
        setSavedMovies(savedMovies);
      })
      .catch((savedMoviesError) => {
        setSavedMoviesError(savedMoviesError);
      });
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
  rawMovies: TMovie[] | undefined,
  usersSavedMovies: TMovie[] | undefined
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
