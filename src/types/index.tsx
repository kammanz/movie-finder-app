import firebase from 'firebase/compat/app';

export type TClickType = 'add' | 'remove';
export type TDropdownMenu = {
  menuSortType: TMovieSortOptions;
  onSortChange: (value: TMovieSortOptions) => void;
};
export type TuserEmail = string | null | undefined;
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
export type TMovieList = {
  userEmail: TuserEmail;
};
export type TMovieSortOptions = 'oldest' | 'newest' | 'thirty-days';
export type TUser = firebase.User | null;
export type TUseUser = {
  user: TUser;
  updateUser: (user: TUser) => void;
  clearUser: () => void;
};
