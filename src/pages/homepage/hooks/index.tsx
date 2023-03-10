import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseSetup';
import { fullUrl } from '../../../api';
import { TCurrentUserEmail, TMovie, TMovieId } from '../../../types/types';
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
  } = useQuery(queryKeys.movies, getMovies);
  return { data, isLoading, isError };
};

export const getSavedMovies = async (currentUser: TCurrentUserEmail) => {
  try {
    const usersMoviesRef = await collection(db, `users/${currentUser}/movies`);
    const q = query(usersMoviesRef);
    const querySnapshot = await getDocs(q);
    let savedMovies: Array<TMovieId> = [];
    querySnapshot.forEach((doc) => {
      doc.id && savedMovies.push({ id: parseInt(doc.id) });
    });

    return savedMovies;
  } catch (error) {
    throw error;
  }
};

export const addSavedMoviesToList = (
  movies: TMovie[] | undefined,
  usersSavedMovies: TMovieId[]
) => {
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
};
