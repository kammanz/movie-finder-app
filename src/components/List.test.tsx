import React, { useState } from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import List from './List';
import handleSelectChange from './List';

// handle select change will...
// 0. get called
// 1. take a number
// 2. call newReleases func
// 3. sort new releases
// 4. check if there are zero releases, then set state is there are none
// 5. set display data state
// 6. render new list (which should have nothing it)

const dateArr = [
  { date: new Date('2020-01-02') },
  { date: new Date('2020-01-01') },
  { date: new Date('2020-01-03') },
];

describe('List', () => {
  it('renders correctly', () => {
    render(<List />);
  });

  it.only('displays a list of movies', async () => {
    render(<List />);
    const movies = await screen.findAllByRole('listitem');
    expect(movies).toHaveLength(3);
  });

  it('has a dropdown menu', () => {
    render(<List />);

    const dropdown = screen.getByTestId('select') as HTMLSelectElement;

    expect(dropdown).toBeInTheDocument();
  });

  it('captures the user selection', () => {
    render(<List />);

    const dropdown = screen.getByTestId('select') as HTMLSelectElement;

    fireEvent.change(dropdown, { target: { value: '1' } });
    expect(dropdown.value).toEqual('1');
  });

  // it('handles the user selection', () => {
  //   render(<List />);

  //   const dropdown = screen.getByTestId('select') as HTMLSelectElement;

  //   fireEvent.change(dropdown, { target: { value: '1' } });
  //   expect(handleSelectChange).toBeCalled();
  // });
});

export {};
