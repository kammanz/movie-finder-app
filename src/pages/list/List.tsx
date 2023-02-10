import React from 'react';
import { useQuery } from 'react-query';
import styles from './List.module.css';
import { imgUrl, moviesAPI } from '../../api';
import { Dropdown } from 'react-bootstrap';
import DropdownMenu from './DropdownMenu';

export type Movie = {
  id: number;
  poster_path: string;
  release_date: string;
  title: string;
};

const fetchMovies = async () => {
  try {
    const response = await fetch(moviesAPI);
    return response.json();
  } catch (error) {
    throw new Error(typeof error);
  }
};

const List = () => {
  const {
    data: movies,
    isLoading,
    isRefetching,
  } = useQuery('movies', fetchMovies);

  if (isLoading) console.log('isLoading: ', isLoading);

  if (isRefetching) console.log('isRefetching: ', isRefetching);

  if (movies === undefined) return <div />;

  const movieList = () => {
    return movies.results.map((movie: Movie) => {
      return (
        <li key={movie.id} className={styles.card}>
          <img src={imgUrl(movie.poster_path)} alt={`${movie.title} poster`} />
          <h6>{movie.title}</h6>
          <p>Released: {movie.release_date}</p>
        </li>
      );
    });
  };

  return (
    <>
      <h1>List page</h1>
      <DropdownMenu />
      <ul className={styles.listContainer}>{movieList()}</ul>
    </>
  );
};

export default List;
