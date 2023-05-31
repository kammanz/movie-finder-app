export const dropdownStyles = {
  control: (styles: any) => ({
    ...styles,
    width: 200,
    height: 50,
    paddingLeft: 10,
    borderRadius: 10,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.25)',
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
