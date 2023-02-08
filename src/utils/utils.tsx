import React from 'react';
import { subDays, compareAsc } from 'date-fns';

type Movie = {
  release_date: string;
};

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

export const filterAndSortThreeMonths = (data: any) => {
  const currentDate = new Date();
  const threeMonthsAgo = currentDate.setMonth(currentDate.getMonth() - 3);
  const newReleases = data.filter((item: any) => {
    const releaseDate = new Date(item.release_date).getTime();
    if (releaseDate < threeMonthsAgo) {
      return null;
    } else {
      return item;
    }
  });
  return sortByProperty([...newReleases], 'release_date', true);
};

export const newReleases = (movies: Array<Movie>, numberOfDaysAgo: number) => {
  const todaysDate = new Date();
  const filterDate = subDays(todaysDate, numberOfDaysAgo);
  console.log('filterDate: ', filterDate);

  // Filter for new releases
  const filteredMovies = movies.filter((movie) => {
    const releaseDate = new Date(movie.release_date);
    const isMovieReleasedAfterFilterDate = compareAsc(releaseDate, filterDate);

    return isMovieReleasedAfterFilterDate === 1;
  });

  console.log('filteredMovies: ', filteredMovies);

  return filteredMovies;
};
