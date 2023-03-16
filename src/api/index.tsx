import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseSetup';
import { TMovie, TMovieId, TCurrentUserEmail } from '../types';
import { baseUrl, baseImgUrl, genreIds, apiKey } from './constants';
import { currentDate } from '../utils/utils';

export const getImgUrl = (imgPath: string) => `${baseImgUrl}${imgPath}`;

export const urlPath = `?api_key=${apiKey}&primary_release_date.lte=${currentDate}&sort_by=release_date.desc&with_genres=${genreIds.thriller}`;

export const fullUrl = `${baseUrl}${urlPath}`;

// export const addSavedMoviesToList = (
//   movies: TMovie[] | undefined,
//   usersSavedMovies: TMovieId[]
// ) => {
//   const moviesWithUsersSelections =
//     usersSavedMovies.length > 0
//       ? movies?.map((movie) => {
//           let isMatched: boolean = usersSavedMovies.some(
//             (savedMovie) => savedMovie.id === movie.id
//           );
//           return { ...movie, isAdded: isMatched };
//         })
//       : movies;
//   return moviesWithUsersSelections;
// };

// export const getMovies = async () => {
//   try {
//     const { results: movies } = await (await fetch(fullUrl)).json();
//     return movies;
//   } catch (error) {
//     throw new Error(typeof error);
//   }
// };

// export const getSavedMovies = async (currentUser: TCurrentUserEmail) => {
//   try {
//     const usersMoviesRef = await collection(db, `users/${currentUser}/movies`);
//     const q = query(usersMoviesRef);
//     const querySnapshot = await getDocs(q);
//     let savedMovies: Array<TMovieId> = [];
//     querySnapshot.forEach((doc) => {
//       doc.id && savedMovies.push({ id: parseInt(doc.id) });
//     });

//     return savedMovies;
//   } catch (error) {
//     throw error;
//   }
// };
