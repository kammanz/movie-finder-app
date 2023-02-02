import { rest } from 'msw';
import { urlPath, ThrillersUrl } from '../api';

// 'https://api.themoviedb.org/3/discover/movie?'
export const handlers = [
  rest.get('https://api.themoviedb.org/3/discover/movie?', (req, res, ctx) => {
    // const params = req.url.searchParams.get(
    //   '/3/discover/movie?api_key=fc28873a448c0edccf9ab243ad3ae982&with_genres=53'
    // );

    const params = req.url.searchParams.get(
      'api_key=fc28873a448c0edccf9ab243ad3ae982&with_genres=53'
    );

    return res(
      ctx.status(200),
      ctx.json({
        params,
      })
    );

    // return res(
    //   ctx.status(200),

    //   ctx.json([
    //     {
    //       id: 2,
    //       poster_path: 'stringy',
    //       release_date: '2022-01-29',
    //       title: 'string',
    //     },
    //     {
    //       id: 1,
    //       poster_path: 'stringy',
    //       release_date: '2023-01-29',
    //       title: 'string',
    //     },
    //     {
    //       id: 3,
    //       poster_path: 'stringy',
    //       release_date: '2021-01-29',
    //       title: 'string',
    //     },
    //   ])
    // );
  }),
];
