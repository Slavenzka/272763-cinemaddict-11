import FilmCardComponent from '../components/film-card';
import {render} from '../utils/render';
import FilmDetails from '../components/film-details';

export default class CardController {
  constructor(container) {
    this._container = container;
    this.component = null;
    this._card = null;
  }

  render(card) {
    this._card = card;
    this.component = new FilmCardComponent(card);
    render(this._container, this.component);

    this.component.setCardHandler(() => this._renderModal(this._card));

    this.component.setWatchlistButtonHandler(() => {

    });

    this.component.setWatchedButtonHandler(() => {

    });

    this.component.setFavoriteButtonHandler(() => {

    });
  }

  _renderModal(card) {
    const filmDetails = new FilmDetails(card);
    const mainContainer = document.querySelector(`.main`);
    mainContainer.appendChild(filmDetails.getElement());
  }
}
