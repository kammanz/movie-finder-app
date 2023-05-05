import React from 'react';
import { getImgUrl } from '../../api/index';
import { CardProps } from '../../types';
import Clapboard from '../placeholder';
import styles from './index.module.css';

const Card = ({ movie, handleAdd, handleRemove, listType }: CardProps) => {
  const moviePoster = movie.poster_path ? (
    <img
      src={getImgUrl(movie.poster_path)}
      alt={`${movie.title} poster`}
      className={styles.poster}
    />
  ) : (
    <Clapboard title="movie clapper" />
  );

  return (
    <li key={movie.id} className={styles.cardContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.posterContainer}>{moviePoster}</div>
        <div className={styles.textContainer}>
          <h6 className={styles.title} title={movie.title}>
            {movie.title}
          </h6>
          <p
            className={styles.releaseDate}
            title={`Released: ${movie.release_date}`}>
            Released: {movie.release_date}
          </p>
          <div className={styles.buttonContainer}>
            {listType === 'databaseMovies' && (
              <button
                onClick={() => handleAdd(movie)}
                disabled={movie.isAdded}
                className={`${styles.addButton} ${
                  movie.isAdded ? styles.clicked : ''
                }`}>
                {movie.isAdded ? 'Added!' : 'Add'}
              </button>
            )}
            <button
              disabled={!movie.isAdded}
              onClick={() => handleRemove(movie)}
              className={`${styles.removeButton} ${
                movie.isAdded ? '' : styles.clicked
              }`}>
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Card;
