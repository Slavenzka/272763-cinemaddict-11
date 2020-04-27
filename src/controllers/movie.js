import FilmCardComponent from '../components/film-card';
import {render} from '../utils/render';

export default class CardController {
  constructor(container) {
    this._container = container;
    this.component = null;
  }

  render(card) {
    this.component = new FilmCardComponent(card);
    render(this._container, this.component);
  }
}
