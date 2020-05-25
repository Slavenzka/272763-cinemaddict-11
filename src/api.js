class API {
  constructor(authorization) {
    this._authorization = authorization;
  }

  getTasks() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/movies`, {headers})
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }

  getComment(filmID) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/comments/${filmID}`, {headers})
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }

  updateFilm(id, data) {
    console.log(id);
    console.log(data);
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-Type`, `application/json`);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/movies/${id}`, {
      method: `PUT`,
      body: JSON.stringify(data),
      headers: new Headers({
        "Authorization": this._authorization,
        "Content-Type": `application/json`
      }),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      });
  }
}

export default API;
