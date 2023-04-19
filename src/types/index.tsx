import firebase from 'firebase/compat/app';
import { SELECT_MENU_OPTIONS } from '../constants/selectMenuOptions';

export type ClickType = 'add' | 'remove';
export type DropdownMenu = {
  sortType: MovieSortOptions;
  onSortChange: (value: MovieSortOptions) => void;
  onResetMovies: () => void;
  isDisabled: boolean;
};
export type UserId = string | null | undefined;
export type Movie = {
  isAdded: boolean;
  isWatched: boolean;
  id: number;
  poster_path: string;
  release_date: string;
  title: string;
};
export type MovieSortOptions =
  | typeof SELECT_MENU_OPTIONS[0]['label']
  | typeof SELECT_MENU_OPTIONS[1]['label']
  | typeof SELECT_MENU_OPTIONS[2]['label'];
export type User = firebase.User | null;
export type FormType = 'signup' | 'login';

export type MovieListProps = {
  sortType: MovieSortOptions;
  listType: 'databaseMovies' | 'usersSavedMovies';
};

export type CardProps = {
  movie: Movie;
  handleAdd: (movie: Movie) => void;
  handleRemove: (movie: Movie) => void;
  listType: 'databaseMovies' | 'usersSavedMovies';
};
