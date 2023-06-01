const isMobile = window.innerWidth < 768;
const fontSize = isMobile ? 10 : 16;
const chevronSize = isMobile ? 14 : 20;
const controlPadding = isMobile ? 14 : 20;

export const dropdownStyles = {
  container: (provided: any) => ({
    ...provided,
  }),
  control: (styles: any) => ({
    ...styles,
    minWidth: 82,
    paddingRight: controlPadding,
    borderRadius: 10,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.25)',
    fontSize: fontSize,
  }),
  valueContainer: (provided: any) => ({
    ...provided,
  }),
  indicatorsContainer: (provided: any) => ({
    ...provided,
  }),
  indicatorSeparator: (base: any) => ({
    ...base,
    display: 'none',
  }),
  indicatorContainer: (provided: any) => ({
    ...provided,
    width: chevronSize,
    padding: 0,
  }),
  dropdownIndicator: (base: any) => ({
    ...base,
    color: 'rgba(0, 0, 0, 0.7)',
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#409DE1' : 'white',
    fontSize: fontSize,
  }),
};
