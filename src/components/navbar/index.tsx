import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './index.module.css';

function Navbar() {
  return (
    <nav className={styles.navContainer}>
      <ul className={styles.listContainer}>
        <li>
          <NavLink
            to="/homepage"
            className={({ isActive }) =>
              isActive ? styles.active : styles.inActive
            }>
            Homepage
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/saved-movies"
            className={({ isActive }) =>
              isActive ? styles.active : styles.inActive
            }>
            Saved Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
