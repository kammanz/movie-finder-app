import React from 'react';
import { imgUrl } from '../../api';
import { addMovie } from '../../utils/utils';
import { TMovie } from '../../types/types';
import styles from './MovieList.module.css';

const Movie = (movie: TMovie, currentUser: string) => (
  <li className={styles.card}>
    <img src={imgUrl(movie.poster_path)} alt={`${movie.title} poster`} />
    <h6>{movie.title}</h6>
    <p>Released: {movie.release_date}</p>
    <button
      onClick={() => addMovie({ movie, currentUser })}
      disabled={movie.isAdded}>
      Add
    </button>
    <button disabled={!movie.isAdded}>Remove</button>
  </li>
);

const MovieList = ({ movies }: { movies: TMovie[] }) => (
  <ul className={styles.container}>
    {movies.length > 0 ? (
      movies.map((movie: TMovie) => <Movie key={movie.id} {...movie} />)
    ) : (
      <li>'Your search returned no results'</li>
    )}
  </ul>
);

export default MovieList;
