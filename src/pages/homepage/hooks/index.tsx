import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseSetup';
import { fullUrl } from '../../../api';
import { TuserEmail, TMovie, TMovieId } from '../../../types';
import { useQuery } from 'react-query';
import { queryKeys } from '../../../react-query/constants';
import { queryClient } from '../../../react-query/queryClient';

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

export const getUsersSavedMovies = async (userEmail: TuserEmail) => {
  console.log('getUsersSavedMovies ran');
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

    console.log('savedMovies', savedMovies);
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
  // wash the movies list

  // get query data
  // const queryData: TMovie[] | undefined = queryClient.getQueryData('movies');
  // const moviesWithUsersSelections: TMovie[] | undefined = addSavedMoviesToList(
  //   queryData,
  //   data
  // );
  // console.log('moviesWithUsersSelections: ', moviesWithUsersSelections);
  // // queryClient.setQueryData('movies', moviesWithUsersSelections);
  // console.log('queryData:', queryData);
  return { data, isLoading, isError };
};

export const addSavedMoviesToList = (
  movies: TMovie[] | undefined,
  usersSavedMovies: TMovieId[] | undefined
) => {
  console.log('addSavedMoviesToList ran');
  console.log('usersSavedMovies', usersSavedMovies);
  // console.log('in addSavedMoviesToList, movies', movies);
  // console.log('in addSavedMoviesToList, usersSavedMovies', usersSavedMovies);

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
    console.log(
      'addSavedMoviesToList, final, moviesWithUsersSelections',
      moviesWithUsersSelections
    );
    return moviesWithUsersSelections;
  }

  console.log('addSavedMoviesToList, nothing else ran');
  // const moviesWithUsersSelections =
  //   usersSavedMovies.length > 0
  //     ? movies?.map((movie) => {
  //         let isMatched: boolean = usersSavedMovies.some(
  //           (savedMovie) => savedMovie.id === movie.id
  //         );
  //         return { ...movie, isAdded: isMatched };
  //       })
  //     : movies;
  // console.log(
  //   'in addSavedMoviesToList, moviesWithUsersSelections: ',
  //   moviesWithUsersSelections
  // );
  // return moviesWithUsersSelections;
};
