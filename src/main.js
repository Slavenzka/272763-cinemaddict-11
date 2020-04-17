import UserRankClass from './components/user-rank';
import FooterCount from './components/footer-count';
import SiteNavigation from './components/site-navigation';
import Sort from './components/sort';
import {createButtonMoreTemplate} from './components/button-more';
import {createFilmDetailsTemplate} from './components/film-details';
import {renderSectionHeading} from './components/section-heading';
import {render, renderElement, updateProfile, createSectionElement} from './utils';
import {renderFilmCards} from './components/film-cards-list';
import {generateFilters} from './mock/filter';
import {
  BOARD_PRESETS,
} from './const';
import {generateFilms} from './mock/cards';
import {renderExtraCategories} from './components/extra-category';
import {addPagination} from './components/add-pagination';

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

const renderFooter = () => {
  const footerCounterContainer = document.querySelector(`.footer__statistics`);
  const footerCounter = new FooterCount(filmsData.length);
  renderElement(footerCounterContainer, footerCounter.getElement());
};

const renderControls = (mainElement) => {
  const filters = generateFilters(userProfile);

  const siteNavigation = new SiteNavigation(filters);
  renderElement(mainElement, siteNavigation.getElement());

  const siteSorting = new Sort();
  renderElement(mainElement, siteSorting.getElement());
};

const renderModal = (content) => {
  render(document.body, content);
};

const renderContent = () => {
  const mainElement = document.querySelector(`.main`);
  let initialFilmsCounter = initialRenderedCardsQuantity;

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
renderFooter();
renderContent();
// renderModal(createFilmDetailsTemplate(filmsData[0]));
