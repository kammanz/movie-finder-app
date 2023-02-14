import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { expect } from '@jest/globals';
import { renderWithQueryClient } from '../../../test-utils';
import List from '../List';
// import { fetchMovies } from '../List';

const mockFetchMovies = jest.fn();

// jest.mock('../List.tsx', () => ({
//   fetchMovies: (sortType: any) => mockFetchMovies,
// }));

describe('List', () => {
  it('renders correctly', () => {});

  it('displays a list of movies, defaulting to sorted by newest', async () => {
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

  it.only('sorts movies by oldest', async () => {
    renderWithQueryClient(<List />);
    const user = userEvent.setup();

    const movieImages = (await screen.findAllByRole('img', {
      name: /poster$/i,
    })) as unknown as Array<HTMLImageElement>;

    const altTextArray = movieImages.map((movie) => {
      return movie.alt;
    });

    const selectOptionOldest = await screen.findByRole('option', {
      name: /oldest/i,
    });

    console.log('typeof selectOptionOldest: ', typeof selectOptionOldest);

    // before click
    // expect(altTextArray).toEqual([
    //   'Creep poster',
    //   'Conan poster',
    //   'Citizen Kane poster',
    // ]);

    await user.click(selectOptionOldest);

    expect(mockFetchMovies).toBeCalledWith('oldest');

    // after click
    // await waitFor(() => {
    //   expect(altTextArray).toEqual([
    //     'Citizen Kane poster',
    //     'Conan poster',
    //     'Creep poster',
    //   ]);
    // });

    // await waitFor(() => {
    // expect(selectOptionOldest.selected).toBeTruthy();
    // });

    // expect(selectOptionOldest.selected).toBe(true);

    // const setStateMock: any = jest.fn();

    // const useStateMock: any = (useState: any) => [useState, setStateMock];
  });

  it('sorts movies by newest', async () => {
    renderWithQueryClient(<List />);
  });

  it('sorts movies by last 30 days', async () => {
    renderWithQueryClient(<List />);
  });

  it('displays no results message if there are no results', async () => {
    renderWithQueryClient(<List />);
  });
});

export {};
