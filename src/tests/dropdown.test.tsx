import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import selectEvent from 'react-select-event';
import Dropdown from '../components/dropdown';

const mockOnSortChange = jest.fn();

jest.mock('../constants/selectMenuOptions', () => {
  return {
    SELECT_MENU_OPTIONS: [
      { value: 'option1', label: 'Option1' },
      { value: 'option2', label: 'Option2' },
      { value: 'option3', label: 'Option3' },
    ],
  };
});

describe('DropdownMenu component', () => {
  test('renders sort options and handles change', async () => {
    render(<Dropdown onSortChange={mockOnSortChange} />);

    const formElement = screen.getByTestId('form');
    const selectElement = within(formElement).getByRole('combobox');

    await selectEvent.openMenu(selectElement);
    await selectEvent.select(selectElement, 'Option2');

    expect(mockOnSortChange).toHaveBeenCalledWith('option2');
  });
});
