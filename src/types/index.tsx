import firebase from 'firebase/compat/app';
import { recentDays } from '../constants/selectMenuOptions';

export type ClickType = 'add' | 'remove';
export type DropdownMenu = {
  onSortChange: (value: MovieSortOptions) => void;
};
export type UserId = string | null | undefined;
export type Movie = {
  isAdded: boolean;
  isWatched: boolean;
  id: number;
  poster_path: string;
  release_date: string;
  title: string;
  popularity: string;
};
export type MovieSortOptions = 'newest' | 'oldest' | typeof recentDays;
export type User = firebase.User | null;
export type MovieListProps = {
  listType: 'databaseMovies' | 'usersSavedMovies';
};
export type CardProps = {
  movie: Movie;
  handleAdd: (movie: Movie) => void;
  handleRemove: (movie: Movie) => void;
  listType: 'databaseMovies' | 'usersSavedMovies';
};
