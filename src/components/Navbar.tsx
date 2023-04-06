import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/homepage">Homepage</Link>
        </li>
        <li>
          <Link to="/saved-movies">Saved Movies</Link>
        </li>
        <li>
          <Link to="/watched-movies">Watched Movies</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
