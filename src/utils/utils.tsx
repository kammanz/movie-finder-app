import {
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  // deleteUser,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseSetup';
import { subDays, compareAsc } from 'date-fns';
import { Movie, MovieSortOptions, UserEmail } from '../types';
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

export const addToFirestore = async (movie: Movie, userEmail: UserEmail) => {
  try {
    await setDoc(doc(db, `users/${userEmail}/movies/${movie.id}`), {
      id: movie.id,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      title: movie.title,
      isAdded: true,
      isWatched: false,
    });
  } catch (error) {
    throw error;
  }
};

export const removeFromFirestore = async (
  movie: Movie,
  userEmail: UserEmail
) => {
  try {
    await deleteDoc(doc(db, `users/${userEmail}/movies/${movie.id}`));
  } catch (error) {
    throw error;
  }
};

export const updateFireStore = async (movie: Movie, userEmail: UserEmail) => {
  try {
    const docRef = await doc(db, `users/${userEmail}/movies/${movie.id}`);
    updateDoc(docRef, {
      isWatched: true,
    });
  } catch (error) {
    console.log('', error);
  }
};

export const deleteFirestoreAccount = async () => {};

export const sortMovies = (sortType: MovieSortOptions, movies: Movie[]) => {
  let sorted;
  switch (sortType) {
    case SELECT_MENU_OPTIONS[0].value:
      sorted = sortByProperty(movies, 'release_date', true);
      break;
    case SELECT_MENU_OPTIONS[1].value:
      sorted = sortByProperty(movies, 'release_date', false);
      break;
    case SELECT_MENU_OPTIONS[2].value.toString():
      sorted = newReleases(movies, Number(SELECT_MENU_OPTIONS[2].value));
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
