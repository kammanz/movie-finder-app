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

export const useFullMovies = () => {
  const [fullMovies, setFullMovies] = useState<TMovie[]>([]);
  const [rawMoviesError, setRawMoviesError] = useState<string>('');
  const [savedMoviesError, setSavedMoviesError] = useState<string>('');
  const { user } = useAuth();
  const userEmail = user?.email;

  useEffect(() => {
    console.log('1. using Promise.all');
    console.log('2. migrating second useEffect into first');
    Promise.all([getRawMovies(), getSavedMovies(userEmail)])
      .then(([rawMovies, savedMovies]) => {
        const updatedMoviesList = addSavedMoviesToList(rawMovies, savedMovies);
        updatedMoviesList && setFullMovies(updatedMoviesList);
      })
      .catch(([rawMoviesError, savedMoviesError]) => {
        setRawMoviesError(rawMoviesError);
        setSavedMoviesError(savedMoviesError);
      });
  }, [userEmail]);

  console.log('3. a) only sending "fullMovies" to MovieList component');
  return { fullMovies, rawMoviesError, savedMoviesError };
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
