import FilmCardComponent from '../components/film-card';
import {render} from '../utils/render';
import {replace, remove} from '../utils/render';
import FilmAdapter from '../adapters/filmAdapter';
import moment from 'moment';
import modalController from '../controllers/modal';
import apiWithProvider from '../api/provider';

export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this.component = null;
    this._card = null;
    this._onDataChange = onDataChange;
    this._modalController = modalController;

    this._controlButtonClickHandler = this._controlButtonClickHandler.bind(this);
  }

  render(card) {
    const oldCardComponent = this.component;
    this.component = new FilmCardComponent(card);
    this._card = card;

    if (this._modalController.id === this._card.id) {
      this._modalController.updateHandlers(this._controlButtonClickHandler, this._onDataChange);
    }

    if (oldCardComponent) {
      replace(this.component, oldCardComponent);
      this.component.setCardHandler(() => this._renderModal(this._card.id));
    } else {
      render(this._container, this.component);
      this.component.setCardHandler(() => this._renderModal(this._card.id));
    }

    this.component.setWatchlistButtonHandler((evt) => {
      evt.preventDefault();
      this._controlButtonClickHandler(`watchlist`);
    });

    this.component.setWatchedButtonHandler((evt) => {
      evt.preventDefault();
      this._controlButtonClickHandler(`alreadyWatched`);
    });

    this.component.setFavoriteButtonHandler((evt) => {
      evt.preventDefault();
      this._controlButtonClickHandler(`favorite`);
    });
  }

  destroy() {
    remove(this.component);
    this._modalController = null;
  }

  _renderModal(id) {
    this._modalController.render((type, callback) => this._controlButtonClickHandler(type, callback), this._onDataChange, id);
  }

  _controlButtonClickHandler(type, callback) {
    const copyUserData = Object.assign({}, this._card.userDetails);
    copyUserData[type] = !this._card.userDetails[type];

    if (type === `alreadyWatched` && copyUserData[type]) {
      copyUserData.watchingDate = moment().format();
    }

    const updatedFilmData = Object.assign({}, this._card, {
      userDetails: copyUserData
    });

    apiWithProvider.updateFilm(this._card.id, updatedFilmData)
      .then((response) => {
        const formattedResponse = FilmAdapter.parseFilm(response);

        this._onDataChange(this._card, Object.assign({}, this._card, {
          userDetails: formattedResponse.userDetails
        }));

        if (callback) {
          callback();
        }
      });
  }
}
