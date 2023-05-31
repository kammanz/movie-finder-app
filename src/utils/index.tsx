import { doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseSetup';
import { subDays, compareAsc } from 'date-fns';
import { Movie, MovieSortOptions, UserId } from '../types';
import { SELECT_MENU_OPTIONS } from '../constants/selectMenuOptions';

export const sortByProperty = (
  array: any[],
  property: string,
  isDesc: boolean
) => {
  return [...array].sort((a: any, b: any) => {
    if (a[property] < b[property]) {
      let isItDesc = isDesc ? 1 : -1;
      return isItDesc;
    }
    if (a[property] > b[property]) {
      let isItDesc = isDesc ? -1 : 1;
      return isItDesc;
    }
    return 0;
  });
};

export const newReleases = (movies: Array<Movie>, numberOfDaysAgo: number) => {
  const todaysDate = new Date();
  const filterDate = subDays(todaysDate, numberOfDaysAgo);

  const filteredMovies = movies.filter((movie) => {
    const releaseDate = new Date(movie.release_date);
    const isMovieReleasedAfterFilterDate = compareAsc(releaseDate, filterDate);

    return isMovieReleasedAfterFilterDate === 1;
  });

  return filteredMovies;
};

export const addToFirestore = async (movie: Movie, userId: UserId) => {
  try {
    await setDoc(doc(db, `users/${userId}/movies/${movie.id}`), {
      id: movie.id,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      title: movie.title,
      isAdded: true,
      isWatched: false,
      popularity: movie.popularity,
    });
  } catch (error) {
    throw error;
  }
};

export const removeFromFirestore = async (movie: Movie, UserId: UserId) => {
  try {
    await deleteDoc(doc(db, `users/${UserId}/movies/${movie.id}`));
  } catch (error) {
    throw error;
  }
};

export const updateFireStore = async (movie: Movie, UserId: UserId) => {
  try {
    const docRef = await doc(db, `users/${UserId}/movies/${movie.id}`);
    updateDoc(docRef, {
      isWatched: true,
    });
  } catch (error) {
    console.error('error: ', error);
  }
};

export const sortMovies = (sortType: MovieSortOptions, movies: Movie[]) => {
  let sorted;
  switch (sortType) {
    case SELECT_MENU_OPTIONS[0].value:
      sorted = sortByProperty(movies, 'release_date', true);
      break;
    case SELECT_MENU_OPTIONS[1].value:
      sorted = sortByProperty(movies, 'release_date', false);
      break;
    case SELECT_MENU_OPTIONS[2].value:
      sorted = newReleases(movies, parseInt(sortType));
      break;
  }
  return sorted;
};

export const updateCachedMovie = (
  array: Movie[],
  index: number,
  isAdded: Movie['isAdded']
) => {
  if (index >= array.length || index < 0) {
    throw new Error('Invalid index');
  }

  const updatedCachedMovies = [...array];
  updatedCachedMovies[index].isAdded = isAdded;
  return updatedCachedMovies;
};

export const currentDate = new Date().toISOString().slice(0, 10);

export const parseFirebaseError = (error: Error) => {
  let errorString = error.message.slice(
    error.message.indexOf(' '),
    error.message.indexOf('(')
  );

  return errorString;
};
