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
  CARDS_MAIN_LIST_QTY,
  TOTAL_CARDS_QTY,
} from './const';
import {generateFilms} from './mock/cards';
import {renderExtraCategories} from './components/extra-category';
import {renderFooterCount} from './components/footer-count';

const filmsData = generateFilms(TOTAL_CARDS_QTY);
// calculation of total films quantity watched by user
const userWatchedMovies = filmsData.reduce((total, item) => {
  total += item.isWatched ? 1 : 0;
  return total;
}, 0);

const renderUserRank = () => {
  const headerElement = document.querySelector(`.header`);
  render(headerElement, createUserRankTemplate(userWatchedMovies));
};

const renderControls = (mainElement) => {
  const filters = generateFilters();
  render(mainElement, createSiteNavTemplate(filters));
  render(mainElement, createItemsSortTemplate());
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

  renderExtraCategories(filmsSection, filmsData);
};

renderUserRank();
renderContent();
renderFooterCount(filmsData.length);
renderModal(createFilmDetailsTemplate(filmsData[0]));
