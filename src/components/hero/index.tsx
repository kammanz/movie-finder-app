import React from 'react';
import FilmMaker from './FilmMaker';
import styles from './index.module.css';

const Hero = () => {
  return (
    <div className={styles.container}>
      <p>
        Unleash Your <br />
        Cinematic <br />
        <span style={{ color: 'rgb(64, 157, 225)' }}>Adventure</span>
      </p>
      <FilmMaker />
    </div>
  );
};

export default Hero;
