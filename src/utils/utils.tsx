import { doc, setDoc, collection, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseSetup';
import { subDays, compareAsc } from 'date-fns';
import { TMovie, TMovieSortOptions, TCurrentUserEmail } from '../types/types';

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

export const addMovie = async (
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

export const deleteMovie = async (
  movie: TMovie,
  currentUserEmail: TCurrentUserEmail
) => {
  console.log('delete movie fired');
  try {
    // Get a reference to the document you want to delete
    // const documentRef = collection('myCollection').doc('myDocument');
    // const docRef = doc(db, `users/${currentUserEmail}/movies/${movie.id}`)

    await deleteDoc(doc(db, `users/${currentUserEmail}/movies/${movie.id}`));
    console.log('doc deleted');

    // Delete the document
    // docRef.deleteDoc()
    //   .then(() => {
    //     console.log('Document successfully deleted!');
    //   })
    //   .catch((error) => {
    //     console.error('Error removing document: ', error);
    //   });
    // await setDoc(doc(db, `users/${currentUserEmail}/movies/${movie.id}`), {
    //   id: movie.id,
    //   poster_path: movie.poster_path,
    //   release_date: movie.release_date,
    //   title: movie.title,
    //   isAdded: true,
    // });
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
