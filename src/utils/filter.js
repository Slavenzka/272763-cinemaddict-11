import {FilterTypes} from '../const';

export const getAllFilms = (films) => {
  return films;
};

export const getWatchlistFilms = (films) => {
  return films.filter((film) => film.isInWatchlist);
};

export const getHistoryFilms = (films) => {
  return films.filter((film) => film.isWatched);
};

export const getFavoriteFilms = (films) => {
  return films.filter((film) => film.isFavorite);
};

export const getFilmsByFilter = (films, filterType) => {
  switch (filterType) {
    case FilterTypes.All:
      return getAllFilms(films);
    case FilterTypes.WATCHLIST:
      return getWatchlistFilms(films);
    case FilterTypes.HISTORY:
      return getHistoryFilms(films);
    case FilterTypes.FAVORITES:
      return getFavoriteFilms(films);
  }
};
