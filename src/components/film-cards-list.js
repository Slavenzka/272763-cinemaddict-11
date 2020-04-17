import {renderElement} from '../utils';
import FilmCardComponent from '../components/film-card';

export const renderFilmCards = (cards) => {
  const container = document.querySelector(`.films-list__container`);
  cards.forEach((card) => {
    const filmCard = new FilmCardComponent(card);
    renderElement(container, filmCard.getElement());
  });
};
