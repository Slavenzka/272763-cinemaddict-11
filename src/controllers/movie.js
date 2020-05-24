import FilmCardComponent from '../components/film-card';
import {render} from '../utils/render';
import {replace, remove} from '../utils/render';
import {modalController} from '../main';

export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this.component = null;
    this._card = null;
    this._onDataChange = onDataChange;
    this._modalController = null;

    this._controlButtonClickHandler = this._controlButtonClickHandler.bind(this);
  }

  render(card) {
    const oldCardComponent = this.component;
    this.component = new FilmCardComponent(card);
    this._card = card;

    if (oldCardComponent) {
      replace(this.component, oldCardComponent);
      this.component.setCardHandler(() => this._renderModal(this._card));
    } else {
      render(this._container, this.component);
      this.component.setCardHandler(() => this._renderModal(this._card));
    }

    this.component.setWatchlistButtonHandler(() => {
      this._controlButtonClickHandler(`watchlist`);
    });

    this.component.setWatchedButtonHandler(() => {
      this._controlButtonClickHandler(`already_watched`);
    });

    this.component.setFavoriteButtonHandler(() => {
      this._controlButtonClickHandler(`favorite`);
    });
  }

  getCardId() {
    return this._card.id;
  }

  destroy() {
    remove(this.component);
  }

  _renderModal(card) {
    this._modalController = modalController;
    this._modalController.render(this._controlButtonClickHandler, this._onDataChange, card.id);
  }

  _controlButtonClickHandler(type) {
    const copyUserData = Object.assign({}, this._card[`user_details`]);
    copyUserData[type] = !this._card[`user_details`][type];

    this._onDataChange(this._card, Object.assign({}, this._card, {
      [`user_details`]: copyUserData
    }));
  }
}
