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

export interface ICurrentUserEmail {
  currentUserEmail: string | null | undefined;
}

export type THandleAddMovie = {
  movie: TMovie;
  currentUserEmail: ICurrentUserEmail;
};

export type TMovieList = {
  movies: TMovie[];
  currentUserEmail: ICurrentUserEmail;
};
