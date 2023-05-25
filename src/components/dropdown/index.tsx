import React from 'react';
import {
  MovieSortOptions,
  DropdownMenu as DropDownMenuType,
} from '../../types';
import { SELECT_MENU_OPTIONS } from '../../constants/selectMenuOptions';
import Select from 'react-select';

import styles from './index.module.css';

const DropdownMenu = ({ onSortChange, onResetMovies }: DropDownMenuType) => {
  const handleChange = (selectedOption: any) => {
    onSortChange(selectedOption.value as MovieSortOptions);
  };

  const dropdownStyles = {
    control: (styles: any) => ({
      ...styles,
      width: 200,
      height: 50,
      paddingLeft: 10,
      boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.25)',
      borderRadius: 10,
    }),
    dropdownIndicator: (base: any) => ({
      ...base,
      color: 'rgba(0, 0, 0, 0.7)',
    }),
    indicatorSeparator: (base: any) => ({
      ...base,
      display: 'none',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#409DE1' : 'white',
    }),
    container: (provided: any) => ({
      ...provided,
      width: 200,
    }),
  };

  return (
    <div className={styles.container}>
      <form style={{ position: 'relative' }}>
        <Select
          defaultValue={SELECT_MENU_OPTIONS[0]}
          options={SELECT_MENU_OPTIONS}
          onChange={handleChange}
          styles={dropdownStyles}
        />
      </form>
      {/* <button type="button" disabled={isDisabled} onClick={onResetMovies}>
        Show all movies
      </button> */}
    </div>
  );
};

export default DropdownMenu;
