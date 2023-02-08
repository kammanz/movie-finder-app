import React from 'react';
import { useQuery } from 'react-query';
import styles from './List.module.css';
import { imgUrl } from '../api';

export type Movie = {
  id: number;
  poster_path: string;
  release_date: string;
  title: string;
};

const postsUrl = 'https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0';

const moviesUrl =
  'https://api.themoviedb.org/3/discover/movie?api_key=fc28873a448c0edccf9ab243ad3ae982&with_genres=53';

const fetchMovies = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(moviesUrl);
    return response.json();
  } catch (error) {
    console.log('error');
    throw new Error(typeof error);
  }
};

const List = () => {
  const { data, isLoading, isRefetching } = useQuery('movies', fetchMovies);

  if (isLoading) console.log('isLoading: ', isLoading);

  if (isRefetching) console.log('isRefetching: ', isRefetching);

  console.log('data: ', data);

  if (data === undefined) return <div />;

  return (
    <>
      <h1>List page</h1>
      <ul>
        {data.map((movie) => {
          return (
            <li key={movie.id} className={styles.card}>
              <img
                src={imgUrl(movie.poster_path)}
                alt={`${movie.title} poster`}
              />
              <h6>{movie.title}</h6>
              <p>Released: {movie.release_date}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default List;
