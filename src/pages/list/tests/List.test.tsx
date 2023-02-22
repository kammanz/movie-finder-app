import React from 'react';
import { screen, waitFor, fireEvent } from '@testing-library/react';
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

    // before click
    expect(altTextArray).toEqual([
      'Creep poster',
      'Conan poster',
      'Citizen Kane poster',
    ]);

    // await user.click(selectOptionOldest);

    // https://polvara.me/posts/testing-a-custom-select-with-react-testing-library
    // fireEvent is better for dropdown changes than userEvent
    await fireEvent.change(screen.getByTestId('select'), {
      target: { value: 'oldest' },
    });

    // repeating above code
    const movieImagesTwo = (await screen.findAllByRole('img', {
      name: /poster$/i,
    })) as unknown as Array<HTMLImageElement>;

    const altTextArrayTwo = movieImagesTwo.map((movie) => {
      return movie.alt;
    });

    // after click
    expect(altTextArrayTwo).toEqual([
      'Citizen Kane poster',
      'Conan poster',
      'Creep poster',
    ]);
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
