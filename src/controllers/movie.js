import FilmCardComponent from '../components/film-card';
import {render} from '../utils/render';
import FilmDetails from '../components/film-details';
import {replace, remove} from '../utils/render';
import {Mode} from '../const';

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this.component = null;
    this._detailsComponent = null;
    this._card = null;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;

    this._closeModal = this._closeModal.bind(this);
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
      this._onDataChange(card, Object.assign({}, card, {
        isInWatchlist: !card.isInWatchlist
      }));
    });

    this.component.setWatchedButtonHandler(() => {
      this._onDataChange(card, Object.assign({}, card, {
        isWatched: !card.isWatched
      }));
    });

    this.component.setFavoriteButtonHandler(() => {
      this._onDataChange(card, Object.assign({}, card, {
        isFavorite: !card.isFavorite
      }));
    });
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closeModal();
    }
  }

  destroy() {
    remove(this.component);
  }

  _renderModal(card) {
    this._onViewChange();
    this._mode = Mode.DETAILED;

    this._detailsComponent = new FilmDetails(card);
    document.querySelector(`.main`)
      .appendChild(this._detailsComponent.getElement());

    this._detailsComponent.setSubmitHandler();
    this._detailsComponent.setCloseOnClickHandler(this._closeModal);
    this._detailsComponent.setCloseOnEscPressHandler(this._closeModal);
  }

  _closeModal() {
    this._mode = Mode.DEFAULT;
    this._detailsComponent._element.remove();
    this._detailsComponent.removeElement();
  }
}
