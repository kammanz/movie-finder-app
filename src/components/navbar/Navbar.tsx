import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to="/homepage"
            className={({ isActive }) =>
              isActive ? styles.active : 'inactive'
            }>
            Homepage
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/saved-movies"
            className={({ isActive }) =>
              isActive ? styles.active : 'inactive'
            }>
            Saved Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
