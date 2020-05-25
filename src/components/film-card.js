import {destructureObjectSmart, getDurationFromMinutes} from '../utils/common';
import {getNodeFromTemplate} from '../utils/render';
import AbstractComponent from './abstract-component';
import {BOARD_PRESETS} from '../const';

const createButtonTemplate = (type, flag) => {
  let label = type.split(`-`).join(` `);
  label = label[0].toUpperCase() + label.slice(1);
  return (
    `<button class="film-card__controls-item button film-card__controls-item--${type} ${flag && `film-card__controls-item--active`}">${label}</button>`
  );
};

const createFilmCardTemplate = (cardData) => {
  const {
    comments,
    filmInfo,
    userDetails
  } = cardData;

  const {
    title,
    release,
    poster,
    description,
    runtime,
    totalRating,
    genre
  } = filmInfo;
  const formattedDuration = getDurationFromMinutes(runtime);

  const descriptionPreview = description.length > BOARD_PRESETS.comments.trimmedCommentLength
    ? description.slice(0, BOARD_PRESETS.comments.trimmedCommentLength) + `&#8230;`
    : description;

  const watchlistButton = createButtonTemplate(`add-to-watchlist`, userDetails.watchlist);
  const watchedButton = createButtonTemplate(`mark-as-watched`, userDetails.alreadyWatched);
  const favoriteButton = createButtonTemplate(`favorite`, userDetails.favorite);

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${(new Date(release.date)).getFullYear()}</span>
        <span class="film-card__duration">${formattedDuration}</span>
        <span class="film-card__genre">${genre[0]}</span>
      </p>
      <img src="./${poster}" alt="${title}" class="film-card__poster">
      <p class="film-card__description">${descriptionPreview}</p>
      <a class="film-card__comments">${comments.length} comments</a>
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
