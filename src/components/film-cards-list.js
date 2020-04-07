import {render} from '../utils';
import {createFilmCardTemplate} from '../components/film-card';

export const renderFilmCards = (container, cardsQuantity) => {
  for (let i = 0; i < cardsQuantity; i++) {
    render(container, createFilmCardTemplate());
  }
};
