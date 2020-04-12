import {createUserRankTemplate} from './components/user-rank';
import {createSiteNavTemplate} from './components/site-navigation';
import {createItemsSortTemplate} from './components/sort';
import {createButtonMoreTemplate} from './components/button-more';
import {createFilmDetailsTemplate} from './components/film-details';
import {createSectionElement} from './components/section-element';
import {renderSectionHeading} from './components/section-heading';
import {render} from './utils';
import {renderFilmCards} from './components/film-cards-list';
import {generateFilters} from './mock/filter';
import {
  CARDS_EXTRA_LIST_QTY,
  CARDS_MAIN_LIST_QTY,
  EXTRA_CATEGORIES,
  TOTAL_CARDS_QTY,
} from './const';
import {generateFilm, generateFilms} from './mock/cards';

const filmsData = generateFilms(TOTAL_CARDS_QTY);

const renderUserRank = () => {
  const headerElement = document.querySelector(`.header`);
  render(headerElement, createUserRankTemplate());
};

const renderControls = (mainElement) => {
  const filters = generateFilters();
  render(mainElement, createSiteNavTemplate(filters));
  render(mainElement, createItemsSortTemplate());
};

const renderExtraCategory = (container, categoryName = ``) => {
  const filmsCategory = createSectionElement(container, `films-list--extra`);
  renderSectionHeading(filmsCategory, categoryName);
  const filmsCategoryList = createSectionElement(filmsCategory, `films-list__container`, `div`);

  // renderFilmCards(filmsCategoryList, CARDS_EXTRA_LIST_QTY);
};

const renderModal = (content) => {
  render(document.body, content);
};

const renderContent = () => {
  const mainElement = document.querySelector(`.main`);

  renderControls(mainElement);

  const filmsSection = createSectionElement(mainElement, `films`);
  const filmsListSection = createSectionElement(filmsSection, `films-list`);
  renderSectionHeading(filmsListSection, `All movies. Upcoming`, true);
  const filmsListContainer = createSectionElement(filmsListSection, `films-list__container`, `div`);
  renderFilmCards(filmsListContainer, filmsData.slice(0, CARDS_MAIN_LIST_QTY));
  render(filmsListSection, createButtonMoreTemplate());

  EXTRA_CATEGORIES.forEach((category) => {
    renderExtraCategory(filmsSection, category);
  });
};

renderUserRank();
renderContent();
// renderModal(createFilmDetailsTemplate());
