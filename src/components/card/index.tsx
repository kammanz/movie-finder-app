import React from 'react';
import { getImgUrl } from '../../api/index';
import styles from './index.module.css';
import { Movie } from '../../types';

type CardProp = {
  movie: Movie;
  handleAdd: (movie: Movie) => void;
  handleRemove: (movie: Movie) => void;
};

const Card = ({ movie, handleAdd, handleRemove }: CardProp) => {
  return (
    <li key={movie.id} className={styles.card}>
      <img src={getImgUrl(movie.poster_path)} alt={`${movie.title} poster`} />
      <h6>{movie.title}</h6>
      <p>Released: {movie.release_date}</p>
      <button onClick={() => handleAdd(movie)} disabled={movie.isAdded}>
        Add
      </button>
      <button disabled={!movie.isAdded} onClick={() => handleRemove(movie)}>
        Remove
      </button>
    </li>
  );
};

export default Card;
