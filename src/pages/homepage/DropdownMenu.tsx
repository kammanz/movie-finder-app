import React, { useState } from 'react';
import { TMovieSortOptions } from '../../types';

type TDropdownMenu = {
  sortType: TMovieSortOptions;
  onStateChange: any;
};

const DropdownMenu = ({ sortType, onStateChange }: TDropdownMenu) => {
  console.log('DropdownMenu, sortType', sortType);
  const [childState, setChildState] = useState(sortType);
  const handleInputChange = (value: any) => {
    console.log('value', value);
    console.log('value.target.value', value);
    setChildState(value);
    onStateChange(value);
  };
  return (
    <div style={{ backgroundColor: 'lightyellow' }}>
      DropdownMenu
      <form>
        <label htmlFor="sort-movies">Sort by:</label>
        <select
          id="sort-movies"
          data-testid="select"
          //   value={selectedMovieSort}
          value={childState}
          onChange={(event) =>
            handleInputChange(event.target.value as TMovieSortOptions)
          }>
          <option value="newest">newest</option>
          <option value="oldest">oldest</option>
          <option value="thirty-days">last 30 days</option>
        </select>
      </form>
      <button
        type="button"
        //   onClick={() => setSortedMovies(undefined)}
      >
        Show all movies
      </button>
    </div>
  );
};

export default DropdownMenu;
