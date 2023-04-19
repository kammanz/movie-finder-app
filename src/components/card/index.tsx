import React from 'react';
import { getImgUrl } from '../../api/index';
import styles from './index.module.css';
import { CardProps } from '../../types';

const Card = ({ movie, handleAdd, handleRemove, listType }: CardProps) => {
  return (
    <li key={movie.id} className={styles.card}>
      <img src={getImgUrl(movie.poster_path)} alt={`${movie.title} poster`} />
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
