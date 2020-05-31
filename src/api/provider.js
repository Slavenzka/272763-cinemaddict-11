import api from './index';

class Provider {
  constructor(apiComponent) {
    this._api = apiComponent;
  }

  getFilms() {
    return this._api.getFilms();
  }

  getComment(id) {
    return this._api.getComment(id);
  }

  updateFilm(id, data) {
    return this._api.updateFilm(id, data);
  }

  addComment(id, comment) {
    return this._api.addComment(id, comment);
  }

  deleteComment(id) {
    return this._api.deleteComment(id);
  }
}

const apiWithProvider = new Provider(api);
export default apiWithProvider;
