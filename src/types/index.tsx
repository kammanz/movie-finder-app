import firebase from 'firebase/compat/app';
import { SELECT_MENU_OPTIONS } from '../constants/selectMenuOptions';

export type TClickType = 'add' | 'remove';
export type TDropdownMenu = {
  menuSortType: TMovieSortOptions;
  onSortChange: (value: TMovieSortOptions) => void;
  onResetMovies: () => void;
};
export type TuserEmail = string | null | undefined;
export type THandleaddToFirestore = {
  movie: TMovie;
};
export type TMovie = {
  isAdded: boolean;
  isWatched: boolean;
  id: number;
  poster_path: string;
  release_date: string;
  title: string;
};
export type TMovieList = {
  userEmail: TuserEmail;
};
export type TMovieSortOptions =
  | typeof SELECT_MENU_OPTIONS[0]['label']
  | typeof SELECT_MENU_OPTIONS[1]['label']
  | typeof SELECT_MENU_OPTIONS[2]['label'];
export type TUser = firebase.User | null;
export type TUseUser = {
  user: TUser;
  updateUser: (user: TUser) => void;
  clearUser: () => void;
};
