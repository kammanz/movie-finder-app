import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseSetup';
import { fullUrl } from '../../../api';
import { TuserEmail, TMovie } from '../../../types';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../auth/useAuth';

export const getRawMovies = async () => {
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

export const useFullMovies = () => {
  const [fullMovies, setFullMovies] = useState<TMovie[]>([]);
  const [rawMovies, setRawMovies] = useState<TMovie[]>([]);
  const [savedMovies, setSavedMovies] = useState<TMovie[]>([]);
  const [error, setError] = useState<string>('');
  const { user } = useAuth();
  const userEmail = user?.email;

  useEffect(() => {
    getRawMovies()
      .then((rawMovies) => setRawMovies(rawMovies))
      .catch((error: string) => setError(error));
    getSavedMovies(userEmail)
      .then((savedMovies) => setSavedMovies(savedMovies))
      .catch((error: string) => setError(error));
  }, [userEmail]);

  useEffect(() => {
    if (rawMovies && savedMovies) {
      const updatedMoviesList = addSavedMoviesToList(rawMovies, savedMovies);
      updatedMoviesList && setFullMovies(updatedMoviesList);
    }
  }, [rawMovies, savedMovies]);

  return { fullMovies, error };
};

export const addSavedMoviesToList = (
  movies: TMovie[] | undefined,
  usersSavedMovies: TMovie[] | undefined
) => {
  if (usersSavedMovies) {
    const moviesWithUsersSelections =
      usersSavedMovies.length > 0
        ? movies?.map((movie) => {
            let isMatched: boolean = usersSavedMovies.some(
              (savedMovie) => savedMovie.id === movie.id
            );
            return { ...movie, isAdded: isMatched };
          })
        : movies;
    return moviesWithUsersSelections;
  }
};
