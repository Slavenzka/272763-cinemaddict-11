import FilmCardComponent from '../components/film-card';
import {render} from '../utils/render';
import FilmDetails from '../components/film-details';
import {replace} from '../utils/render';

export default class CardController {
  constructor(container, onDataChange) {
    this._container = container;
    this.component = null;
    this._detailsComponent = null;
    this._card = null;
    this._onDataChange = onDataChange;
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

  _renderModal(card) {
    const mainContainer = document.querySelector(`.main`);
    this._detailsComponent = new FilmDetails(card);
    mainContainer.appendChild(this._detailsComponent.getElement());
    this._detailsComponent.setSubmitHandler();
    this._handleCloseModal();
  }

  _handleCloseModal() {
    const closeModal = () => {
      this._detailsComponent._element.remove();
      this._detailsComponent.removeElement();
      document.removeEventListener(`keydown`, closeModalOnEscPress);
    };

    const closeModalOnEscPress = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        closeModal();
      }
    };

    this._detailsComponent.setCloseButtonHandler(closeModal);
    document.addEventListener(`keydown`, closeModalOnEscPress);
  }
}
