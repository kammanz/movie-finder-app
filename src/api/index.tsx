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
  console.log('in addUsersSavedMoviesToList: ', userssavedMovies);
  const moviesWithUsersSelections = movies?.map((movie) => {
    const match = userssavedMovies.find(
      (savedMovieId) => movie.id === savedMovieId.id
    );
    console.log('in addUsersSavedMoviesToList, matched movies array: ', match);
    if (match) {
      console.log('in addUsersSavedMoviesToList, match is TRUE: ', match);
      return { ...movie, isAdded: true };
    } else {
      console.log('in addUsersSavedMoviesToList, match is FALSE: ', match);
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
    let savedMovies: Array<TMovieId> = [];
    querySnapshot.forEach((doc) => {
      doc.id && savedMovies.push({ id: parseInt(doc.id) });
    });

    console.log('fetchUsersSavedMovies, savedMovies: ', savedMovies);
    if (savedMovies.length > 0) alert('savedMovies array now has data');
    return savedMovies;
  } catch (error) {
    throw error;
  }
};
