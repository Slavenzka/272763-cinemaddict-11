import {FilterTypes} from '../const';

export const getAllFilms = (films) => {
  return films;
};

export const getWatchlistFilms = (films) => {
  return films.filter((film) => film[`user_details`][`watchlist`]);
};

export const getHistoryFilms = (films) => {
  return films.filter((film) => film[`user_details`][`already_watched`]);
};

export const getFavoriteFilms = (films) => {
  return films.filter((film) => film[`user_details`][`favorite`]);
};

export const getFilmsByFilter = (films, filterType) => {
  switch (filterType) {
    case FilterTypes.ALL:
      return getAllFilms(films);
    case FilterTypes.WATCHLIST:
      return getWatchlistFilms(films);
    case FilterTypes.HISTORY:
      return getHistoryFilms(films);
    case FilterTypes.FAVORITES:
      return getFavoriteFilms(films);
  }

  return films;
};
