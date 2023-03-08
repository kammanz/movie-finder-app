import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../firebaseSetup';
import { TMovie, TMovieId, TCurrentUserEmail } from '../types/types';

const thrillerId = 53;
const url = 'https://api.themoviedb.org';
const apiKey = 'fc28873a448c0edccf9ab243ad3ae982';
export const imgUrl = (imgPath: string) =>
  `https://image.tmdb.org/t/p/w200/${imgPath}`;

export const ThrillersUrl = `${url}/3/discover/movie?api_key=${apiKey}&with_genres=${thrillerId}`;

let currentDate = new Date().toISOString().slice(0, 10);

export const baseMoviesApi = 'https://api.themoviedb.org/3/discover/movie';
export const moviesAPI = `${baseMoviesApi}?api_key=fc28873a448c0edccf9ab243ad3ae982&primary_release_date.lte=${currentDate}&sort_by=release_date.desc&with_genres=53`;

export const urlPath = `/3/discover/movie?api_key=${apiKey}&with_genres=${thrillerId}`;

// export const addUsersSavedMoviesToList = (
//   movies: TMovie[] | undefined,
//   userssavedMovies: Array<TMovieId>
// ) => {
//   console.log('addUsersSavedMoviesToList ran');
//   console.log('addUsersSavedMoviesToList, movies: ', movies);
//   console.log(
//     'addUsersSavedMoviesToList, userssavedMovies: ',
//     userssavedMovies
//   );
//   const moviesWithUsersSelections = movies?.map((movie) => {
//     const match = userssavedMovies.find(
//       (savedMovieId) => movie.id === savedMovieId.id
//     );
//     console.log('matchey: ', match);
//     if (match) {
//       console.log('match: ', match);
//       return { ...movie, isAdded: true };
//     } else {
//       return { ...movie, isAdded: false };
//     }
//   });

//   return moviesWithUsersSelections;
// };

export const addUsersSavedMoviesToList = (
  movies: TMovie[] | undefined,
  userssavedMovies: Array<TMovieId>
) => {
  console.log('addUsersSavedMoviesToList ran');
  console.log('addUsersSavedMoviesToList, movies: ', movies);
  console.log(
    'addUsersSavedMoviesToList, userssavedMovies: ',
    userssavedMovies
  );
  console.log('userssavedMovies: ', userssavedMovies);
  const moviesWithUsersSelections = movies?.map((movie) => {
    const match = userssavedMovies.find(
      (savedMovieId) => movie.id === savedMovieId.id
    );
    console.log('matchey: ', match);
    if (match) {
      console.log('match: ', match);
      return { ...movie, isAdded: true };
    } else {
      return { ...movie, isAdded: false };
    }
  });

  return moviesWithUsersSelections;
};

export const fetchAllMovies = async () => {
  console.log('fetchAllMovies ran');
  try {
    const { results: movies } = await (await fetch(moviesAPI)).json();
    return movies;
    // return addUsersSavedMoviesToList(movies, userssavedMovies);
  } catch (error) {
    throw new Error(typeof error);
  }
};

export const fetchUsersSavedMovies = async (currentUser: TCurrentUserEmail) => {
  console.log('fetchUsersSavedMovies ran');
  try {
    const usersMoviesRef = await collection(db, `users/${currentUser}/movies`);
    const q = query(usersMoviesRef);
    const querySnapshot = await getDocs(q);
    let movieIds: Array<TMovieId> = [];
    querySnapshot.forEach((doc) => {
      doc.id && movieIds.push({ id: parseInt(doc.id) });
    });

    console.log('fetchUsersSavedMovies, movieIds: ', movieIds);
    return movieIds;
  } catch (error) {
    throw error;
  }
};
