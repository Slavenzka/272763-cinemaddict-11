import {DeleteButtonLabels, KeyCodes} from '../const';
import {
  getDurationFromMinutes,
  getFullDate,
  getFullDateAndTime,
} from '../utils/common';
import AbstractSmartComponent from './abstract-smart-component';
import {encode} from 'he';
import moment from 'moment';
import {getNodeFromTemplate} from '../utils/render';

const SHAKE_ANIMATION_TIMEOUT = 600;

const createFilmDetailsTemplate = (data, comments = [], options) => {
  const {
    filmInfo,
    userDetails
  } = data;

  const {
    title,
    alternativeTitle,
    ageRating,
    totalRating,
    release,
    genre,
    poster,
    description,
    runtime,
    director,
    writers,
    actors
  } = filmInfo;

  const {date, releaseCountry} = release;
  const {inputValue, activeEmoji} = options;
  const dateObject = new Date(date);
  const releaseDate = getFullDate(dateObject);
  const formattedDuration = getDurationFromMinutes(runtime);

  const commentsList = comments.map(({author, comment, date: commentCreationDate, emotion, id}) => {
    const commentDate = getFullDateAndTime(commentCreationDate);
    return (
      `
        <li class="film-details__comment" data-comment-id="${id}">
          <span class="film-details__comment-emoji">
            <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
          </span>
          <div>
            <p class="film-details__comment-text">${encode(comment)}</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">${author}</span>
              <span class="film-details__comment-day">${commentDate}</span>
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
              <img class="film-details__poster-img" src="./${poster}" alt="${title}">
              ${ageRating >= 18 ? `<p class="film-details__age">18+</p>` : ``}
            </div>
            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${alternativeTitle}</p>
                </div>
                <div class="film-details__rating">
                  <p class="film-details__total-rating">${totalRating}</p>
                </div>
              </div>
              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${releaseDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${formattedDuration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${releaseCountry}</td>
                </tr>
                ${genre.length > 0 && `<tr class="film-details__row">
                  <td class="film-details__term">${genre.length > 1 ? `Genres` : `Genre`}</td>
                  <td class="film-details__cell">
                    ${genre.map((genreItem) => (`<span class="film-details__genre">${genreItem}</span>`)).join(``)}
                </tr>`}
              </table>
              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>
          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${userDetails.watchlist ? `checked` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">${userDetails.watchlist ? `In watchlist already` : `Add to watchlist`}</label>
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${userDetails.alreadyWatched ? `checked` : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${userDetails.favorite ? `checked` : ``}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">${userDetails.favorite ? `Added to favorites` : `Add to favorites`}</label>
          </section>
        </div>
        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
            <ul class="film-details__comments-list">
              ${commentsList}
            </ul>
            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">${activeEmoji && activeEmoji.image ? activeEmoji.image.outerHTML : ``}</div>
              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${inputValue}</textarea>
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
  constructor(filmData, commentsData, controlButtonHandler, commentsModel) {
    super();
    this._filmData = filmData;
    this._commentsData = commentsData;
    this._inputValue = ``;
    this._activeEmoji = {};
    this._textarea = null;
    this._commentsModel = commentsModel;

    this._closeHandler = null;
    this._subscribeOnEvents();
    this._controlButtonClickHandler = controlButtonHandler;
    this._deleteCommentHandler = this._commentsModel.removeComment;
    this._addCommentHandler = this._commentsModel.addComment;

    this._setPostCommentHandler = this._setPostCommentHandler.bind(this);
    this._handleEscPress = this._handleEscPress.bind(this);
  }

  getElement() {
    if (!this._element) {
      this._element = getNodeFromTemplate(this.getTemplate());
      this._textarea = this._element.querySelector(`textarea.film-details__comment-input`);
    }
    return this._element;
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._filmData, this._commentsData, {
      inputValue: this._inputValue,
      activeEmoji: this._activeEmoji
    });
  }

  recoverListeners() {
    this._subscribeOnEvents();
    this.setSubmitHandler();
    this.setCloseOnClickHandler(this._closeHandler);
  }

  rerender() {
    super.rerender();
  }

  updateData(newData, newComments) {
    this._filmData = newData;

    if (newComments) {
      this._commentsData = newComments;
    }
    this.rerender();
  }

  setSubmitHandler() {
    document.addEventListener(`keydown`, this._setPostCommentHandler);
  }

  setCloseOnClickHandler(handler) {
    this._closeHandler = handler;

    this._element.querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, (evt) => {
        handler(evt);
        document.removeEventListener(`keydown`, this._handleEscPress);
        document.removeEventListener(`keydown`, this._setPostCommentHandler);
      });
  }

  setCloseOnEscPressHandler() {
    document.addEventListener(`keydown`, this._handleEscPress);
  }

  disableForm() {
    this._textarea.disabled = true;
    this._textarea.style = `box-shadow: none`;
    document.removeEventListener(`keydown`, this._setPostCommentHandler);
  }

  enableForm() {
    this._textarea.disabled = false;
    this.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this.getElement().style.animation = ``;
      this._textarea.style = `box-shadow: 0 0 20px 0 red`;
    }, SHAKE_ANIMATION_TIMEOUT);
    document.addEventListener(`keydown`, this._setPostCommentHandler);
  }

  _setPostCommentHandler(evt) {
    if (this._inputValue.length !== 0 && this._activeEmoji && (evt.ctrlKey || evt.metaKey) && evt.keyCode === KeyCodes.enter) {
      evt.preventDefault();
      const newComment = {
        comment: this._inputValue,
        emotion: this._activeEmoji.type,
        date: moment().format()
      };
      this._addCommentHandler(newComment);
    }
  }

  _subscribeOnEvents() {
    const element = this.getElement();
    const inputComment = element.querySelector(`.film-details__comment-input`);
    const emojiList = [...element.querySelectorAll(`.film-details__emoji-label`)];
    const commentItems = [...element.querySelectorAll(`.film-details__comment`)];

    inputComment.addEventListener(`input`, (evt) => {
      this._inputValue = evt.target.value;
      inputComment.value = this._inputValue;
    });

    emojiList.forEach((emojiLabel) => {
      emojiLabel.addEventListener(`click`, (evt) => {
        if (evt.target.tagName === `IMG`) {
          this._activeEmoji.image = evt.target;
          this._activeEmoji.type = evt.currentTarget.htmlFor.split(`-`)[1];
          this.rerender();
        }
      });
    });

    commentItems.forEach((comment) => {
      comment.addEventListener(`click`, (evt) => {
        if (evt.target.tagName === `BUTTON`) {
          evt.preventDefault();
          evt.target.disabled = true;
          evt.target.innerText = DeleteButtonLabels.FETCHING;
          const commentID = evt.currentTarget.dataset.commentId;
          this._deleteCommentHandler(commentID, () => this._setCommentStateToError(comment, evt.target));
        }
      });
    });

    this._setWatchlistButtonHandler();
    this._setWatchedButtonHandler();
    this._setFavoriteButtonHandler();
  }

  _setCommentStateToError(commentItem, button) {
    commentItem.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      commentItem.style.animation = ``;
      button.innerText = DeleteButtonLabels.REGULAR;
      button.disabled = false;
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  _setWatchlistButtonHandler() {
    this.getElement().querySelector(`#watchlist`)
      .addEventListener(`change`, () => {
        this._controlButtonClickHandler(`watchlist`);
      });
  }

  _setWatchedButtonHandler() {
    this.getElement().querySelector(`#watched`)
      .addEventListener(`change`, () => {
        this._controlButtonClickHandler(`alreadyWatched`);
      });
  }

  _setFavoriteButtonHandler() {
    this.getElement().querySelector(`#favorite`)
      .addEventListener(`change`, () => {
        this._controlButtonClickHandler(`favorite`);
      });
  }

  resetCommentData() {
    this._inputValue = ``;
    this._activeEmoji = {};
  }

  _handleEscPress(evt) {
    if (this._element && evt.key === `Escape` || evt.key === `Esc`) {
      this._closeHandler();
      document.removeEventListener(`keydown`, this._handleEscPress);
      document.removeEventListener(`keydown`, this._setPostCommentHandler);
    }
  }
}
