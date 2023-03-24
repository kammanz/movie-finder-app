import React, { useState } from 'react';
import { TMovieSortOptions, TDropdownMenu } from '../../types';
import { SELECT_MENU_OPTIONS } from '../../constants/selectMenuOptions';

const DropdownMenu = ({
  menuSortType,
  onSortChange,
  onResetMovies,
}: TDropdownMenu) => {
  console.log('menuSortType', menuSortType);
  const [sortType, setSortType] = useState(menuSortType);

  const handleChange = (newSortType: TMovieSortOptions) => {
    console.log('1. handleChange called, newSortType: ', newSortType);
    setSortType(newSortType);
    onSortChange(newSortType);
  };

  return (
    <div style={{ backgroundColor: 'lightyellow' }}>
      <form>
        <label htmlFor="sort-movies">Sort by:</label>
        <select
          id="sort-movies"
          data-testid="select"
          value={menuSortType}
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
