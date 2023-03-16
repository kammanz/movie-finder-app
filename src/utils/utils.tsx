import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseSetup';
import { subDays, compareAsc } from 'date-fns';
import { TMovie, TMovieSortOptions, TCurrentUserEmail } from '../types';

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

export const newReleases = (movies: Array<TMovie>, numberOfDaysAgo: number) => {
  const todaysDate = new Date();
  const filterDate = subDays(todaysDate, numberOfDaysAgo);

  const filteredMovies = movies.filter((movie) => {
    const releaseDate = new Date(movie.release_date);
    const isMovieReleasedAfterFilterDate = compareAsc(releaseDate, filterDate);

    return isMovieReleasedAfterFilterDate === 1;
  });

  return filteredMovies;
};

export const addToFirestore = async (
  movie: TMovie,
  currentUserEmail: TCurrentUserEmail
) => {
  try {
    await setDoc(doc(db, `users/${currentUserEmail}/movies/${movie.id}`), {
      id: movie.id,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      title: movie.title,
      isAdded: true,
    });
  } catch (error) {
    throw error;
  }
};

export const removeFromFirestore = async (
  movie: TMovie,
  currentUserEmail: TCurrentUserEmail
) => {
  try {
    await deleteDoc(doc(db, `users/${currentUserEmail}/movies/${movie.id}`));
  } catch (error) {
    throw error;
  }
};

export const sortMovies = (sortType: TMovieSortOptions, movies: TMovie[]) => {
  let sorted;
  switch (sortType) {
    case 'oldest':
      sorted = sortByProperty(movies, 'release_date', false);
      break;
    case 'newest':
      sorted = sortByProperty(movies, 'release_date', true);
      break;
    case 'thirty-days':
      sorted = newReleases(movies, 3);
      break;
  }

  return sorted;
};

export const updateCachedMovie = (
  array: TMovie[],
  index: number,
  isAdded: TMovie['isAdded']
) => {
  if (index >= array.length || index < 0) {
    throw new Error('Invalid index');
  }

  const updatedCachedMovies = [...array];
  updatedCachedMovies[index].isAdded = isAdded;
  return updatedCachedMovies;
};

export const currentDate = new Date().toISOString().slice(0, 10);
