import React from 'react';
import { getImgUrl } from '../../api/index';
import { CardProps } from '../../types';
import Clapboard from '../placeholder';
import styles from './index.module.css';

const Card = ({ movie, handleAdd, handleRemove, listType }: CardProps) => {
  const moviePoster = movie.poster_path ? (
    <img src={getImgUrl(movie.poster_path)} alt={`${movie.title} poster`} />
  ) : (
    <Clapboard title="movie clapper" />
  );

  return (
    <li key={movie.id} className={styles.card}>
      {moviePoster}
      <h6>{movie.title}</h6>
      <p>Released: {movie.release_date}</p>
      {listType === 'databaseMovies' && (
        <button onClick={() => handleAdd(movie)} disabled={movie.isAdded}>
          Add
        </button>
      )}
      <button disabled={!movie.isAdded} onClick={() => handleRemove(movie)}>
        Remove
      </button>
    </li>
  );
};

export default Card;
