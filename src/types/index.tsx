import firebase from 'firebase/compat/app';

export type TClickType = 'add' | 'remove';
export type TCurrentUserEmail = string | null | undefined;
export type THandleaddToFirestore = {
  movie: TMovie;
};
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
export type TMovieList = {
  movies: TMovie[];
  currentUserEmail: TCurrentUserEmail;
};
export type TMovieSortOptions = 'oldest' | 'newest' | 'thirty-days';
export type TUser = firebase.User | null;
export type TUseUser = {
  user: TUser;
  updateUser: (user: TUser) => void;
  clearUser: () => void;
};
