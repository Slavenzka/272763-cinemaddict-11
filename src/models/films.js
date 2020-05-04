import {FilterTypes} from '../const';
import {getFilmsByFilter} from '../utils/filter';

export default class FilmsModel {
  constructor() {
    this._films = [];
    this._activeFilterType = FilterTypes.ALL;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getFilms() {
    return getFilmsByFilter(this._films, this._activeFilterType);
  }

  getFilmsAll() {
    return this._films;
  }

  setFilms(films) {
    this._films = Array.from(films);
    this._callHandlers(this._dataChangeHandlers);
  }

  updateFilm(id, film) {
    const index = this._films.indexOf((item) => item.id === id);

    if (index === -1) {
      return {
        status: false
      };
    }

    this._films = [].concat(this._films.slice(0, index), film, this._films.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);

    return {
      status: true,
      index
    };
  }

  removeFilm(id) {
    const index = this._films.indexOf((film) => film.id === id);

    if (index === -1) {
      return false;
    }

    this._films = [].concat(this._films.slice(0, index), this._films.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  addFilm(film) {
    this._films = [].concat(this._films, film);
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
