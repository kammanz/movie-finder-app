import React, { useState, FC } from 'react';
import { useQuery } from 'react-query';
import styles from './List.module.css';
import { imgUrl, moviesAPI } from '../../api';
import { sortByProperty, newReleases } from '../../utils/utils';

export type Movie = {
  id: number;
  poster_path: string;
  release_date: string;
  title: string;
};

export const fetchMovies = async (sortType: string) => {
  try {
    const { results: movies } = await (await fetch(moviesAPI)).json();
    switch (sortType) {
      case 'newest':
        return movies;
      case 'oldest':
        return sortByProperty(movies, 'release_date', false);
      case 'thirty-days':
        return newReleases(movies, 3);
      default:
        return;
    }
  } catch (error) {
    throw new Error(typeof error);
  }
};

const List = () => {
  const [selectedMovieSort, setSelectedMovieSort] = useState('newest');
  const {
    data: movies,
    isLoading,
    isError,
    error,
  } = useQuery(['movies', selectedMovieSort], () =>
    fetchMovies(selectedMovieSort)
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    error instanceof Error && <span>Error: {error.message}</span>;
  }

  const Movie = (movie: Movie) => (
    <li className={styles.card}>
      <img src={imgUrl(movie.poster_path)} alt={`${movie.title} poster`} />
      <h6>{movie.title}</h6>
      <p>Released: {movie.release_date}</p>
    </li>
  );

  const MovieList = () => (
    <ul className={styles.listContainer}>
      {movies.length
        ? movies.map((movie: Movie) => <Movie key={movie.id} {...movie} />)
        : 'Your search returned no results'}
    </ul>
  );

  return (
    <>
      <h1>List page</h1>
      <form>
        <label htmlFor="sort-movies">Sort by:</label>
        <select
          id="sort-movies"
          value={selectedMovieSort}
          onChange={(e) => setSelectedMovieSort(e.target.value)}>
          <option value="newest">newest</option>
          <option value="oldest">oldest</option>
          <option value="thirty-days">last 30 days</option>
        </select>
      </form>
      <MovieList />
    </>
  );
};

export default List;
