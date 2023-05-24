import React from 'react';
import {
  MovieSortOptions,
  DropdownMenu as DropDownMenuType,
} from '../../types';
import { SELECT_MENU_OPTIONS } from '../../constants/selectMenuOptions';
import Select from 'react-select';
import MagnifyingGlass from '../magnifyingGlass';
import Chevron from '../chevron';

import styles from './index.module.css';

const DropdownMenu = ({
  sortType,
  onSortChange,
  onResetMovies,
  isDisabled,
}: DropDownMenuType) => {
  // const handleChange = (newSortType: MovieSortOptions) => {
  //   onSortChange(newSortType);
  // };

  const handleChange = (selectedOption: any) => {
    onSortChange(selectedOption.value as MovieSortOptions);
  };

  return (
    <div>
      <form>
        {/* <MagnifyingGlass /> */}
        {/* <label htmlFor="sort-movies">Sort by:</label> */}
        {/* <select
          id="sort-movies"
          data-testid="select"
          value={sortType}
          disabled={isDisabled}
          style={{ width: '500px' }}
          onChange={(event) =>
            handleChange(event.target.value as MovieSortOptions)
          }>
          {SELECT_MENU_OPTIONS.map((option) => {
            return (
              <option
                key={option.label}
                value={option.value}
                className={styles.option}>
                {option.label}
              </option>
            );
          })}
        </select> */}
        <Select
          // value={sortType} // Assuming sortType is the currently selected option
          options={SELECT_MENU_OPTIONS}
          onChange={handleChange}
          // inputValue="" // Add appropriate value if needed
          // onInputChange={() => {}} // Add appropriate handler if needed
          // onMenuOpen={() => {}} // Add appropriate handler if needed
          // onMenuClose={() => {}} // Add appropriate handler if needed
          // isDisabled={isDisabled} // Add appropriate value if needed
          // menuIsOpen={false} // Add appropriate value if needed
        />
        {/* <Chevron /> */}
      </form>
      {/* <button type="button" disabled={isDisabled} onClick={onResetMovies}>
        Show all movies
      </button> */}
    </div>
  );
};

export default DropdownMenu;
