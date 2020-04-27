import FilmCardComponent from '../components/film-card';
import {render} from '../utils/render';

export default class MovieController {
  constructor(container) {
    this._container = container;
  }

  render(card) {
    const filmCard = new FilmCardComponent(card);
    render(this._container, filmCard);
  }
}
