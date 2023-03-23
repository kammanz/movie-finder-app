import { baseUrl, baseImgUrl, genreIds, apiKey } from './constants';
import { currentDate } from '../utils/utils';

export const getImgUrl = (imgPath: string) => `${baseImgUrl}${imgPath}`;

export const urlPath = `?api_key=${apiKey}&primary_release_date.lte=${currentDate}&sort_by=release_date.desc&with_genres=${genreIds.thriller}`;

export const fullUrl = `${baseUrl}${urlPath}`;
