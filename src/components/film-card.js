import {addLeadingZero} from '../utils/common';
import {getNodeFromTemplate} from '../utils/render';
import AbstractComponent from './abstract-component';

const createButtonTemplate = (type, flag) => {
  let label = type.split(`-`).join(` `);
  label = label[0].toUpperCase() + label.slice(1);
  return (
    `<button class="film-card__controls-item button film-card__controls-item--${type} ${flag && `film-card__controls-item--active`}">${label}</button>`
  );
};

const createFilmCardTemplate = ({
  name,
  rating,
  date,
  genres,
  poster,
  descriptionPreview,
  userComments,
  runtime,
  isInWatchlist,
  isWatched,
  isFavourite
}) => {
  const hours = Math.trunc(runtime / 60);
  const minutes = runtime - hours * 60 > 10 ? `${runtime - hours * 60}` : `0${runtime - hours * 60}`;

  const watchlistButton = createButtonTemplate(`add-to-watchlist`, isInWatchlist);
  const watchedButton = createButtonTemplate(`mark-as-watched`, isWatched);
  const favoriteButton = createButtonTemplate(`favorite`, isFavourite);

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${name}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${(new Date(date)).getFullYear()}</span>
        <span class="film-card__duration">${hours > 0 ? `${hours}h` : ``} ${addLeadingZero(minutes)}m</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="./images/posters/${poster}" alt="${name}" class="film-card__poster">
      <p class="film-card__description">${descriptionPreview}</p>
      <a class="film-card__comments">${userComments.length} comments</a>
      <form class="film-card__controls">
        ${watchlistButton}
        ${watchedButton}
        ${favoriteButton}
      </form>
    </article>`
  );
};

export default class FilmCard extends AbstractComponent {
  constructor(filmCard) {
    super();
    this._filmCard = filmCard;
  }

  getTemplate() {
    return createFilmCardTemplate(this._filmCard);
  }

  getElement() {
    if (!this._element) {
      this._element = getNodeFromTemplate(this.getTemplate());
    }
    return this._element;
  }

  setCardHandler(handler) {
    const modalTriggers = [];
    const filmPoster = this._element.querySelector(`.film-card__poster`);
    const filmTitle = this._element.querySelector(`.film-card__title`);
    const filmComments = this._element.querySelector(`.film-card__comments`);
    modalTriggers.push(filmPoster, filmTitle, filmComments);

    modalTriggers.forEach((item) => item.addEventListener(`click`, handler));
  }

  setWatchlistButtonHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setWatchedButtonHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  setFavoriteButtonHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }
}
