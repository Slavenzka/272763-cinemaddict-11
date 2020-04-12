import {CARDS_LOAD_MORE_QTY} from './../const';
import {render} from './../utils';
import {createFilmCardTemplate} from './film-card';

export const addPagination = (button, totalFilms, filmsCount) => {
  const filmsListContainer = document.querySelector(`.films-list__container`);
  let prevFilmsCount = filmsCount;

  const next = () => {
    filmsCount += CARDS_LOAD_MORE_QTY;

    totalFilms
      .slice(prevFilmsCount, filmsCount)
      .forEach((film) => render(filmsListContainer, createFilmCardTemplate(film)));

    prevFilmsCount = filmsCount;
  };

  const checkAllElementsLoaded = () => {
    if (filmsCount >= totalFilms.length) {
      button.remove();
    }
  };

  button.addEventListener(`click`, () => {
    next();
    checkAllElementsLoaded();
  });
};
