import React from 'react';
import { format } from 'date-fns';
import { getImgUrl } from '../../api/index';
import { CardProps } from '../../types';
import Clapboard from '../placeholder';
import Star from '../starSVG';
import styles from './index.module.css';

const Card = ({ movie, handleAdd, handleRemove, listType }: CardProps) => {
  console.log('movie', movie);
  const date = new Date(movie.release_date);
  const formattedDate = format(date, 'MMMM d, yyyy');

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
            title={`Released: ${formattedDate}`}>
            Released: {formattedDate}
          </p>
          <div className={styles.popularityContainer}>
            <span>
              <Star />
            </span>
            <p
              className={styles.popularity}
              title={`Released: ${formattedDate}`}>
              {movie.popularity}
            </p>
          </div>
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
