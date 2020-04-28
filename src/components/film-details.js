import {KEY_CODES, MONTHS} from '../const';
import {addLeadingZero} from '../utils/common';
import AbstractSmartComponent from './abstract-smart-component';

const createFilmDetailsTemplate = ({
  name,
  nameOriginal,
  rating,
  date,
  runtime,
  genres,
  poster,
  description,
  team,
  country,
  userComments,
  isInWatchlist,
  isWatched,
  isFavorite,
  isAdult
}, options) => {
  const {activeEmoji} = options;
  const dateObject = new Date(date);
  const day = dateObject.getDate() < 10 ? `0${dateObject.getDate()}` : `${dateObject.getDate()}`;
  const month = MONTHS[dateObject.getMonth()];
  const year = dateObject.getFullYear();

  const hours = Math.trunc(runtime / 60);
  const minutes = runtime - hours * 60 > 10 ? `${runtime - hours * 60}` : `0${runtime - hours * 60}`;

  const commentsList = userComments.map((comment) => {
    const commentDate = new Date(comment.date);
    const commentYear = commentDate.getFullYear();
    const commentMonth = addLeadingZero(commentDate.getMonth() + 1);
    const commentDay = addLeadingZero(commentDate.getDate());
    const commentHours = addLeadingZero(commentDate.getHours());
    const commentMinutes = addLeadingZero(commentDate.getMinutes());
    return (
      `
        <li class="film-details__comment">
          <span class="film-details__comment-emoji">
            <img src="./images/emoji/${comment.emoji}.png" width="55" height="55" alt="emoji-${comment.emoji}">
          </span>
          <div>
            <p class="film-details__comment-text">${comment.text}</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">${comment.name}</span>
              <span class="film-details__comment-day">${commentYear}/${commentMonth}/${commentDay} ${commentHours}:${commentMinutes}</span>
              <button class="film-details__comment-delete">Delete</button>
            </p>
          </div>
        </li>
      `
    );
  }).join(``);

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${poster}" alt=${name}>

              ${isAdult
      ? `<p class="film-details__age">18+</p>`
      : ``
    }
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${name}</h3>
                  <p class="film-details__title-original">Original: ${nameOriginal}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${team.director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${team.writers.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${team.actors.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${day} ${month} ${year}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${hours > 0 ? `${hours}h` : ``} ${minutes}m</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${genres.length > 1 ? `Genres` : `Genre`}</td>
                  <td class="film-details__cell">
                    ${genres.map((genre) => (`<span class="film-details__genre">${genre}</span>`)).join(``)}
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isInWatchlist ? `checked` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">${isInWatchlist ? `In watchlist already` : `Add to watchlist`}</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? `checked` : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? `checked` : ``}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">${isFavorite ? `Added to favorites` : `Add to favorites`}</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${userComments.length}</span></h3>

            <ul class="film-details__comments-list">
              ${commentsList}
            </ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">${activeEmoji ? activeEmoji.outerHTML : ``}</div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class FilmDetails extends AbstractSmartComponent {
  constructor(filmData) {
    super();
    this._filmData = filmData;
    this._inputValue = ``;
    this._activeEmoji = null;

    this._closeHandler = null;
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._filmData, {
      inputValue: this._inputValue,
      activeEmoji: this._activeEmoji
    });
  }

  recoverListeners() {
    this.setSubmitHandler();
    this._subscribeOnEvents();
    this.setCloseOnClickHandler(this._closeHandler);
  }

  rerender() {
    super.rerender();
  }

  setSubmitHandler() {
    const form = this.getElement().querySelector(`form`);
    document.addEventListener(`keydown`, (evt) => this._setPostCommentHandler(evt, form));
  }

  setCloseOnClickHandler(handler) {
    this._closeHandler = handler;

    this._element.querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);
  }

  setCloseOnEscPressHandler() {
    const handleEscPress = (evt) => {
      if (this._element && evt.key === `Escape` || evt.key === `Esc`) {
        this._closeHandler();
        document.removeEventListener(`keydown`, handleEscPress);
      }
    };
    document.addEventListener(`keydown`, handleEscPress);
  }

  _setPostCommentHandler(evt) {
    if (this._inputValue.length !== 0 && evt.ctrlKey && evt.keyCode === KEY_CODES.enter) {
      evt.preventDefault();
      // form.submit();
      // form.reset();
      this.rerender();
      document.removeEventListener(`keydown`, this._setPostCommentHandler);
    }
  }

  _subscribeOnEvents() {
    const element = this.getElement();
    const inputComment = element.querySelector(`.film-details__comment-input`);
    const emojiList = element.querySelector(`.film-details__emoji-list`);

    inputComment.addEventListener(`input`, (evt) => {
      this._inputValue = evt.target.value;
      inputComment.value = this._inputValue;
    });

    emojiList.addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `IMG`) {
        this._activeEmoji = evt.target;
        this.rerender();
      }
    });
  }
}
