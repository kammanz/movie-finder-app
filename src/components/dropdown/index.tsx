import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import {
  MovieSortOptions,
  DropdownMenu as DropDownMenuType,
} from '../../types';
import { SELECT_MENU_OPTIONS } from '../../constants/selectMenuOptions';
import getDropdownStyles from './dropdownStyles';
import styles from './index.module.css';

const DropdownMenu = ({ onSortChange }: DropDownMenuType) => {
  const initialState = window.innerWidth < 767;
  const [isMobile, setIsMobile] = useState(initialState);
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      setIsMobile(windowWidth < 767);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const dropdownStyles = getDropdownStyles(isMobile);
  const handleChange = (selectedOption: any) => {
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
