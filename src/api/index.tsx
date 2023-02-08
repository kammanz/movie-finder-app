import axios from 'axios';

const moviesApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3/discover/movie',
});

export const getMovies = async () => {
  const response = await moviesApi.get(
    'api_key=fc28873a448c0edccf9ab243ad3ae982&with_genres=53'
  );

  return response.data;
};

const thrillerId = 53;
const url = 'https://api.themoviedb.org';
const apiKey = 'fc28873a448c0edccf9ab243ad3ae982';
export const imgUrl = (imgPath: string) =>
  `https://image.tmdb.org/t/p/w200/${imgPath}`;

export const ThrillersUrl = `${url}/3/discover/movie?api_key=${apiKey}&with_genres=${thrillerId}`;

export const urlPath = `/3/discover/movie?api_key=${apiKey}&with_genres=${thrillerId}`;

// full url:
// https://api.themoviedb.org/3/discover/movie?api_key=fc28873a448c0edccf9ab243ad3ae982&with_genres=53
