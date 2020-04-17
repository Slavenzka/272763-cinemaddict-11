import {render} from '../utils';
import {createFilmCardTemplate} from '../components/film-card';

export const renderFilmCards = (container, cards) => {
  cards.forEach((card) => render(container, createFilmCardTemplate(card)));
};
