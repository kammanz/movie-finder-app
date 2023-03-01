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

export type addMovieProps = {
  movie: TMovie;
  currentUser: string;
};

export type TMovieSortOptions = 'oldest' | 'newest' | 'thirty-days';
