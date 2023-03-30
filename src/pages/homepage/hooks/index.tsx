import { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseSetup';
import { fullUrl } from '../../../api';
import { TuserEmail, TMovie } from '../../../types';
import { useAuth } from '../../../auth/useAuth';

export const getRawMovies = async (): Promise<TMovie[]> => {
  const { results: movies } = await (await fetch(fullUrl)).json();
  return movies;
};

export const getSavedMovies = async (userEmail: TuserEmail) => {
  const usersMoviesRef = await collection(db, `users/${userEmail}/movies`);
  const q = query(usersMoviesRef);
  const querySnapshot = await getDocs(q);
  let savedMovies: Array<TMovie> = [];
  querySnapshot.forEach((doc) => {
    const { id, isAdded, poster_path, release_date, title } = doc.data();
    savedMovies.push({
      id,
      isAdded,
      poster_path,
      release_date,
      title,
    });
  });

  return savedMovies;
};

export const useFullMovies = (isRefetching: boolean) => {
  const [rawMovies, setRawMovies] = useState<TMovie[]>([]);
  const [savedMovies, setSavedMovies] = useState<TMovie[]>([]);
  const [rawMoviesError, setRawMoviesError] = useState<string>('');
  const [savedMoviesError, setSavedMoviesError] = useState<string>('');
  const { user } = useAuth();
  const userEmail = user?.email;

  useEffect(() => {
    Promise.resolve(getRawMovies())
      .then((rawMovies) => {
        setRawMovies(rawMovies);
      })
      .catch((rawMoviesError: string) => {
        setRawMoviesError(rawMoviesError);
      });

    Promise.resolve(getSavedMovies(userEmail))
      .then((savedMovies) => {
        setSavedMovies(savedMovies);
      })
      .catch((savedMoviesError) => {
        setSavedMoviesError(savedMoviesError);
      });
  }, [userEmail]);

  useEffect(() => {
    Promise.resolve(getSavedMovies(userEmail))
      .then((savedMovies) => {
        setSavedMovies(savedMovies);
      })
      .catch((savedMoviesError) => {
        setSavedMoviesError(savedMoviesError);
      });
  }, [userEmail, isRefetching]);

  let moviesToRender =
    rawMovies?.length && savedMovies?.length
      ? addSavedMoviesToList(rawMovies, savedMovies)
      : rawMovies;

  return { moviesToRender, rawMovies, rawMoviesError, savedMoviesError };
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
