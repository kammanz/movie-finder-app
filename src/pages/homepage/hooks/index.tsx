import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseSetup';
import { fullUrl } from '../../../api';
import { TuserEmail, TMovie } from '../../../types';
import { useState, useEffect } from 'react';
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

  return { fullMovies, rawMoviesError, savedMoviesError };
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
