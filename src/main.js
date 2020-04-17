import UserRankClass from './components/user-rank';
import {createSiteNavTemplate} from './components/site-navigation';
import {createItemsSortTemplate} from './components/sort';
import {createButtonMoreTemplate} from './components/button-more';
import {createFilmDetailsTemplate} from './components/film-details';
import {createSectionElement} from './components/section-element';
import {renderSectionHeading} from './components/section-heading';
import {render, renderElement} from './utils';
import {renderFilmCards} from './components/film-cards-list';
import {generateFilters} from './mock/filter';
import {
  BOARD_PRESETS,
} from './const';
import {generateFilms} from './mock/cards';
import {renderExtraCategories} from './components/extra-category';
import {renderFooterCount} from './components/footer-count';
import {addPagination} from './components/add-pagination';
import {updateProfile} from './components/update-profile';

const {
  totalCardsQuantity,
  initialRenderedCardsQuantity
} = BOARD_PRESETS;
const filmsData = generateFilms(totalCardsQuantity);

const userProfile = {
  watchlist: 0,
  history: 0,
  favourites: 0
};

updateProfile(filmsData, userProfile);

const renderHeader = () => {
  const headerElement = document.querySelector(`.header`);
  const userRank = new UserRankClass(userProfile.history);
  renderElement(headerElement, userRank.getElement());
};

const renderControls = (mainElement) => {
  const filters = generateFilters(userProfile);
  render(mainElement, createSiteNavTemplate(filters));
  render(mainElement, createItemsSortTemplate());
};

const renderModal = (content) => {
  render(document.body, content);
};

const renderContent = () => {
  let initialFilmsCounter = initialRenderedCardsQuantity;

  const mainElement = document.querySelector(`.main`);

  renderControls(mainElement);

  const filmsSection = createSectionElement(mainElement, `films`);
  const filmsListSection = createSectionElement(filmsSection, `films-list`);
  renderSectionHeading(filmsListSection, `All movies. Upcoming`, true);
  const filmsListContainer = createSectionElement(filmsListSection, `films-list__container`, `div`);

  renderFilmCards(filmsListContainer, filmsData.slice(0, initialFilmsCounter));

  render(filmsListSection, createButtonMoreTemplate());
  const loadMoreButton = filmsListSection.querySelector(`.films-list__show-more`);
  addPagination(loadMoreButton, filmsData, initialFilmsCounter);

  renderExtraCategories(filmsSection, filmsData);
};

renderHeader();
renderContent();
renderFooterCount(filmsData.length);
renderModal(createFilmDetailsTemplate(filmsData[0]));
