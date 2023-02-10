import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import List from '../List';
import { renderWithQueryClient } from '../../../test-utils';
import { expect } from '@jest/globals';
// import { selectOptions } from '@testing-library/user-event/dist/types/utility';

describe('List', () => {
  it('renders correctly', () => {});

  it('displays a list of movies', async () => {
    renderWithQueryClient(<List />);

    const movieImages = (await screen.findAllByRole('img', {
      name: /poster$/i,
    })) as unknown as Array<HTMLImageElement>;
    const altText = movieImages.map((movie) => {
      return movie.alt;
    });
    expect(altText).toEqual([
      'Conan poster',
      'Creep poster',
      'Citizen Kane poster',
    ]);
  });

  it.only('sorts movies by newest', async () => {
    renderWithQueryClient(<List />);

    const user = userEvent.setup();

    // expect the user to see a dropdown menu

    const selectOption = await screen.findByRole('option', { name: /newest/i });
    expect(selectOption).toBeTruthy();

    // await user.click(selectOption);

    // expect(selectOption).selected

    // expect(dropdownmenu).toBeInTheDocument();
    // expect(
    //   screen.findByRole('option', { name: /newest/i })
    //     .selected as HTMLFormElement
    // ).toBe(true);

    // expect the user to open it and see options
    // expect the user to click their option
    // expect onchange handler to be called with thier option (newest in this case)
    // expect the user to see movies sorted by newest
    // if there is no movie, expect the user to see a 'no results' message

    // expect(recieved).toBe([])
  });
});

export {};
