import React, { useState } from 'react';
import { TMovieSortOptions, TDropdownMenu } from '../../types';

const DropdownMenu = ({ menuSortType, onSortChange }: TDropdownMenu) => {
  const [sortType, setSortType] = useState(menuSortType);
  const handleChange = (value: TMovieSortOptions) => {
    setSortType(value);
    onSortChange(value);
  };
  return (
    <div style={{ backgroundColor: 'lightyellow' }}>
      <form>
        <label htmlFor="sort-movies">Sort by:</label>
        <select
          id="sort-movies"
          data-testid="select"
          value={sortType}
          onChange={(event) =>
            handleChange(event.target.value as TMovieSortOptions)
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
