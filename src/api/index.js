const Methods = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const Statuses = {
  VALID: {
    min: 200,
    max: 300
  }
};

class API {
  constructor(endpoint, authorization) {
    this._endpoint = endpoint;
    this._authorization = authorization;
  }

  checkStatus(response) {
    if (response.status >= Statuses.VALID.min && response.status < Statuses.VALID.max) {
      return response;
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  getFilms() {
    return this._load({url: `movies`})
      .then((response) => response.json());
  }

  getComment(filmID) {
    return this._load({url: `comments/${filmID}`})
      .then((response) => response.json())
      .then((response) => {
        return response;
      });
  }

  updateFilm(id, data) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-Type`, `application/json`);

    return this._load({
      url: `movies/${id}`,
      method: Methods.PUT,
      body: JSON.stringify(this._getServerFormattedData(data)),
      headers
    })
      .then((response) => response.json());
  }

  addComment(filmID, newComment) {
    const headers = new Headers();
    headers.append(`Content-Type`, `application/json`);

    return this._load({
      url: `comments/${filmID}`,
      method: Methods.POST,
      headers,
      body: JSON.stringify(newComment)
    })
      .then((response) => {
        return response.json();
      });
  }

  deleteComment(id) {
    return this._load({url: `comments/${id}`, method: Methods.DELETE});
  }

  _load({url, method = Methods.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endpoint}/${url}`, {method, body, headers})
      .then(this.checkStatus)
      .catch((err) => {
        throw err;
      });
  }

  _getServerFormattedData(data) {
    return {
      id: data.id,
      comments: data.comments,
      [`film_info`]: {
        title: data.filmInfo.title,
        [`alternative_title`]: data.filmInfo.alternativeTitle,
        [`total_rating`]: data.filmInfo.totalRating,
        poster: data.filmInfo.poster,
        [`age_rating`]: data.filmInfo.ageRating,
        director: data.filmInfo.director,
        writers: data.filmInfo.writers,
        actors: data.filmInfo.actors,
        release: {
          date: data.filmInfo.release.date,
          [`release_country`]: data.filmInfo.release.releaseCountry
        },
        runtime: data.filmInfo.runtime,
        genre: data.filmInfo.genre,
        description: data.filmInfo.description
      },
      [`user_details`]: {
        watchlist: data.userDetails.watchlist,
        [`already_watched`]: data.userDetails.alreadyWatched,
        [`watching_date`]: data.userDetails.watchingDate,
        favorite: data.userDetails.favorite
      }
    };
  }
}

export default API;
