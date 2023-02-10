import { rest } from 'msw';
import { moviesAPI, ThrillersUrl } from '../api';

const mockMovies = [
  {
    id: 2,
    poster_path: 'path 2',
    release_date: '2022-01-29',
    title: 'Conan',
  },
  {
    id: 1,
    poster_path: 'path 1',
    release_date: '2023-01-29',
    title: 'Creep',
  },
  {
    id: 3,
    poster_path: 'path 3',
    release_date: '2021-01-29',
    title: 'Citizen Kane',
  },
];

export const handlers = [
  rest.get('https://www.google.com', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ results: mockMovies }));
  }),
];
