import React from 'react';
import BannerMobile from '../../assets/svgs/bannerMobile';
import Banner from '../../assets/svgs/banner';
import styles from './index.module.css';

const isMobile = window.innerWidth < 768;

const Hero = () => {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <p>
          Unleash Your <br />
          Cinematic <br />
          <span style={{ color: 'rgb(64, 157, 225)' }}>Adventure</span>
        </p>
      </div>
      <div className={styles.bannerContainer}>
        {isMobile ? <BannerMobile /> : <Banner />}
      </div>
    </div>
  );
};

export default Hero;
