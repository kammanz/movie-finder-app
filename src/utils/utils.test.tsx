import { newReleases } from '.';

// type Array = {
//   date: Date;
// };

// const dateArr: Array[] = [
//   { date: new Date('2020-01-02') },
//   { date: new Date('2020-01-01') },
//   { date: new Date('2020-01-03') },
// ];

// test('oldest to newest', () => {
//   const received = sortByProperty(dateArr, 'date', false);

//   const expected = [
//     { date: new Date('2020-01-01') },
//     { date: new Date('2020-01-02') },
//     { date: new Date('2020-01-03') },
//   ];

//   expect(received).toEqual(expected);
// });

// test('newest to oldest', () => {
//   const received = sortByProperty(dateArr, 'date', true);

//   const expected = [
//     { date: new Date('2020-01-03') },
//     { date: new Date('2020-01-02') },
//     { date: new Date('2020-01-01') },
//   ];

//   expect(received).toEqual(expected);
// });

// const newReleases = (movies: Array<Movie>, numberOfDaysAgo: number) => {
//   const todaysDate = new Date();
//   const filterDate = subDays(todaysDate, numberOfDaysAgo);
//   console.log('filterDate: ', filterDate);

//   // Filter for new releases
//   const filteredMovies = movies.filter((movie) => {
//     const releaseDate = new Date(movie.release_date);
//     const isMovieReleasedAfterFilterDate = compareAsc(releaseDate, filterDate);

//     return isMovieReleasedAfterFilterDate === 1;
//   });

//   return filteredMovies;
// };

test('Returns movies released within last 30 days', () => {
  let expectedDate = '2022-12-30';

  const moviesArray = [
    {
      id: 1,
      poster_path: 'string',
      release_date: expectedDate,
      title: 'string',
      isAdded: true,
    },
    {
      id: 2,
      poster_path: 'string',
      release_date: expectedDate,
      title: 'string',
      isAdded: true,
    },
    {
      id: 1,
      poster_path: 'string',
      release_date: expectedDate,
      title: 'string',
      isAdded: true,
    },
    { release_date: '2022-12-29' },
    { release_date: '2020-12-26' },
  ];

  const expected = [
    { release_date: expectedDate },
    { release_date: '2022-12-29' },
  ];

  //TODO: fix this mess

  // let received = newReleases(moviesArray, 30);

  // expect(received).toEqual(expected);
});

test('Returns movies released within last 90 days', () => {
  let expectedDate = '2022-11-1';
  let secondExpectedDate = '2022-10-31';
  let thirdExpectedDate = '2022-10-29';

  const moviesArray = [
    { release_date: expectedDate },
    { release_date: secondExpectedDate },
    { release_date: thirdExpectedDate },
  ];

  const expected = [
    { release_date: expectedDate },
    { release_date: secondExpectedDate },
    // { release_date: thirdExpectedDate },
  ];

  // let received = newReleases(moviesArray, 90);

  // expect(received).toEqual(expected);
});
