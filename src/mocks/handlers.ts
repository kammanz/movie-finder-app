import { rest } from 'msw';

const posts = 'https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0';

const movies = 'https://api.themoviedb.org/3/discover/movies';

const movies2 =
  'https://api.themoviedb.org/3/discover/movie?api_key=fc28873a448c0edccf9ab243ad3ae982&with_genres=53';

export const handlers = [
  rest.get(movies, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
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
      ])
    );
  }),
];
