import React, { useState } from 'react';
import { TMovieSortOptions, TDropdownMenu } from '../../types';
import { SELECT_MENU_OPTIONS } from '../../constants/selectMenuOptions';

const DropdownMenu = ({
  menuSortType,
  onSortChange,
  onResetMovies,
}: TDropdownMenu) => {
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
          {SELECT_MENU_OPTIONS.map((option) => {
            return (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>
      </form>
      <button type="button" onClick={onResetMovies}>
        Show all movies
      </button>
    </div>
  );
};

export default DropdownMenu;
