import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseSetup';
import { fullUrl } from '../../../api';
import { TuserEmail, TMovie } from '../../../types';
import { useQuery } from 'react-query';
import { queryKeys } from '../../../react-query/constants';

export const getMovies = async () => {
  try {
    const { results: movies } = await (await fetch(fullUrl)).json();
    return movies;
  } catch (error) {
    throw new Error(typeof error);
  }
};

export const useMovies = () => {
  const fallback: any = [];
  const {
    data = fallback,
    isLoading,
    isError,
    error,
  } = useQuery(queryKeys.movies, getMovies, {
    refetchOnWindowFocus: false,
  });
  return { data, isLoading, isError, error };
};

export const getUsersSavedMovies = async (userEmail: TuserEmail) => {
  try {
    const usersMoviesRef = await collection(db, `users/${userEmail}/movies`);
    const q = query(usersMoviesRef);
    const querySnapshot = await getDocs(q);
    let savedMovies: Array<TMovie> = [];
    querySnapshot.forEach((doc) => {
      doc.id &&
        savedMovies.push({
          id: doc.data().id,
          isAdded: doc.data().isAdded,
          poster_path: doc.data().poster_path,
          release_date: doc.data().release_date,
          title: doc.data().title,
        });
    });

    return savedMovies;
  } catch (error) {
    throw error;
  }
};

export const useUsersSavedMovies = (userEmail: TuserEmail) => {
  const fallback: any = [];
  const {
    data = fallback,
    isLoading,
    isError,
  } = useQuery([queryKeys.user, queryKeys.usersSavedMovies], () =>
    getUsersSavedMovies(userEmail)
  );
  return { data, isLoading, isError };
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
