export type TMovie = {
  isAdded: boolean;
  id: number;
  poster_path: string;
  release_date: string;
  title: string;
};

export type TMovieId = {
  id: number;
};

export type TMovieSortOptions = 'oldest' | 'newest' | 'thirty-days';

export type TCurrentUserEmail = string | null | undefined;

export type THandleaddToFirestore = {
  movie: TMovie;
};

export type TMovieList = {
  movies: TMovie[];
  currentUserEmail: TCurrentUserEmail;
};
