import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseSetup';
import { subDays, compareAsc } from 'date-fns';
import { TMovie, addMovieProps } from '../types/types';

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

export const addMovie = async ({ movie, currentUser }: addMovieProps) => {
  try {
    await setDoc(doc(db, `users/${currentUser}/movies/${movie.id}`), {
      id: movie.id,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      title: movie.title,
      isAdded: true,
    });
    // TODO: query the database by movie id, find the movie, update its isAdded property
    // page should rerender because cache has been updated
  } catch (error) {
    throw error;
  }
};
