import {FilterTypes} from '../const';
import {getFilmsByFilter} from '../utils/filter';

class FilmsModel {
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
    const index = this._films.findIndex((item) => item.id === id);

    if (index === -1) {
      return {
        status: false
      };
    }

    this._films = [].concat(this._films.slice(0, index), film, this._films.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);

    return {
      status: true,
      index,
      id
    };
  }

  addComment(film) {
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

const filmsModel = new FilmsModel();
export default filmsModel;
