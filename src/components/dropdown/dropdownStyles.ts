const getDropdownStyles = (isMobile: boolean) => {
  return {
    control: (provided: any, state: any) => ({
      ...provided,
      minWidth: '20vw',
      borderRadius: 10,
      boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.25)',
      fontSize: isMobile ? 12 : 16,
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      textAlign: 'center',
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      display: 'none',
    }),
    indicatorContainer: (provided: any) => ({
      ...provided,
      width: isMobile ? 14 : 20,
      padding: 0,
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: 'rgba(0, 0, 0, 0.7)',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#409DE1' : 'white',
      fontSize: isMobile ? 10 : 16,
    }),
  };
};

export default getDropdownStyles;
