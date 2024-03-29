import { useState, useEffect, useCallback } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseSetup';
import { fullUrl } from '../api';
import { UserId, Movie } from '../types';
import { useAuth } from '../auth/useAuth';

export const getRawMovies = async (): Promise<Movie[]> => {
  const { results } = await (await fetch(fullUrl)).json();

  const movies: Movie[] = results.map((movie: Movie) => {
    return { ...movie, isAdded: false, isWatched: false };
  });

  return movies;
};

export const getSavedMovies = async (UserId: UserId) => {
  const usersMoviesRef = await collection(db, `users/${UserId}/movies`);
  const q = query(usersMoviesRef);
  const querySnapshot = await getDocs(q);
  let savedMovies: Movie[] | undefined;

  if (!querySnapshot.empty) {
    savedMovies = querySnapshot.docs.map((doc) => {
      const {
        id,
        isAdded,
        poster_path,
        release_date,
        title,
        isWatched,
        popularity,
      } = doc.data();
      return {
        id,
        isAdded,
        isWatched,
        poster_path,
        release_date,
        title,
        popularity,
      };
    });
  } else {
    savedMovies = [];
  }

  return savedMovies;
};

export const useFullMovies = () => {
  const [rawMovies, setRawMovies] = useState<Movie[]>([]);
  const [savedMovies, setSavedMovies] = useState<Movie[] | undefined>(
    undefined
  );
  const [rawMoviesError, setRawMoviesError] = useState<string>();
  const [savedMoviesError, setSavedMoviesError] = useState<string>();
  const { user } = useAuth();

  const getFirestoreMovies = useCallback(async () => {
    if (user) {
      try {
        const result = await getSavedMovies(user.uid);
        setSavedMovies(result);
      } catch (e) {
        setSavedMoviesError(e as string);
      }
    }
  }, [user]);

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
