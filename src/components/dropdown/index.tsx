import React from 'react';
import {
  MovieSortOptions,
  DropdownMenu as DropDownMenuType,
} from '../../types';
import { SELECT_MENU_OPTIONS } from '../../constants/selectMenuOptions';

const DropdownMenu = ({
  sortType,
  onSortChange,
  onResetMovies,
  isDisabled,
}: DropDownMenuType) => {
  const handleChange = (newSortType: MovieSortOptions) => {
    console.log('1. in DropdownMenu, in handleChange, good');
    onSortChange(newSortType);
  };

  return (
    <div style={{ backgroundColor: 'lightyellow' }}>
      <form>
        <label htmlFor="sort-movies">Sort by:</label>
        <select
          id="sort-movies"
          data-testid="select"
          value={sortType}
          disabled={isDisabled}
          onChange={(event) =>
            handleChange(event.target.value as MovieSortOptions)
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
      <button type="button" disabled={isDisabled} onClick={onResetMovies}>
        Show all movies
      </button>
    </div>
  );
};

export default DropdownMenu;
