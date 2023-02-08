import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import List from './List';

describe('List', () => {
  it('renders correctly', () => {});

  it('displays message for empty list', async () => {
    // render(<List />);
  });

  it.only('displays a list of movies', async () => {
    // render(<List />);

    // find image tags
    const movieImages = (await screen.findAllByRole('img', {
      name: /poster$/i,
    })) as unknown;

    // confirm for typescript they are indeed image tags, so we can access their 'alt' properties
    const movieImages2 = movieImages as Array<HTMLImageElement>;

    // confirm alt text of image tags
    const altText = movieImages2.map((movie) => {
      return movie.alt;
    });
    expect(altText).toEqual([
      'Conan poster',
      'Creep poster',
      'Citizen Kane poster',
    ]);
  });

  it('has a dropdown menu', async () => {
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
});

export {};
