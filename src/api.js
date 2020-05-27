class API {
  constructor(authorization) {
    this._authorization = authorization;
  }

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  getFilms() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/movies`, {headers})
      .then(this.checkStatus)
      .then((response) => response.json())
      .then((data) => data);
  }

  getComment(filmID) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/comments/${filmID}`, {headers})
      .then(this.checkStatus)
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }

  updateFilm(id, data) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-Type`, `application/json`);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/movies/${id}`, {
      method: `PUT`,
      body: JSON.stringify(this._getServerFormattedData(data)),
      headers: new Headers({
        "Authorization": this._authorization,
        "Content-Type": `application/json`
      }),
    })
      .then(this.checkStatus)
      .then((response) => response.json());
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
