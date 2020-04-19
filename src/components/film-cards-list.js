import {renderElement} from '../utils';
import FilmCardComponent from '../components/film-card';

export const renderFilmCards = (cards, cardsContainer) => {
  const container = cardsContainer || document.querySelector(`.films-list__container`);
  cards.forEach((card) => {
    const filmCard = new FilmCardComponent(card);
    renderElement(container, filmCard.getElement());
  });
};
