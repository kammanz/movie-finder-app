import React from 'react';
import Select from 'react-select';
import {
  MovieSortOptions,
  DropdownMenu as DropDownMenuType,
} from '../../types';
import { SELECT_MENU_OPTIONS } from '../../constants/selectMenuOptions';
import { dropdownStyles } from './dropdownStyles';
import styles from './index.module.css';

const DropdownMenu = ({ onSortChange }: DropDownMenuType) => {
  const handleChange = (selectedOption: any) => {
    console.log('selectedOption', selectedOption);
    onSortChange(selectedOption.value as MovieSortOptions);
  };

  return (
    <div className={styles.container}>
      <p>Sort by: </p>
      <form style={{ position: 'relative' }}>
        <Select
          defaultValue={SELECT_MENU_OPTIONS[0]}
          options={SELECT_MENU_OPTIONS}
          onChange={handleChange}
          styles={dropdownStyles}
        />
      </form>
    </div>
  );
};

export default DropdownMenu;
