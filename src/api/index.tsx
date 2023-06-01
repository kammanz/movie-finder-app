import { baseUrl, genreIds, apiKey } from './constants';
import { currentDate } from '../utils';

export const getImgUrl = (imgPath: string) => `${baseImgUrl}${imgPath}`;
const isMobile = window.innerWidth < 768;
// const posterSize = isMobile ? '185' : '342';
const posterSize = '342';
export const baseImgUrl = `https://image.tmdb.org/t/p/w${posterSize}/`;
export const urlPath = `?api_key=${apiKey}&primary_release_date.lte=${currentDate}&sort_by=release_date.desc&with_genres=${genreIds.thriller}`;

export const fullUrl = `${baseUrl}${urlPath}`;
