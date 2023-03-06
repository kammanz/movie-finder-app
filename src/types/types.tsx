export type TMovie = {
  id: number;
  poster_path: string;
  release_date: string;
  title: string;
  isAdded: boolean;
};

export type TMovieId = {
  id: number;
};

export type TMovieSortOptions = 'oldest' | 'newest' | 'thirty-days';

export type TCurrentUserEmail = string | null | undefined;

export type THandleAddMovie = {
  movie: TMovie;
  // currentUserEmail: TCurrentUserEmail;
};

export type TMovieList = {
  movies: TMovie[];
  // currentUserEmail: TCurrentUserEmail;
};
