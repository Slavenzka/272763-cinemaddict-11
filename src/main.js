import UserRankClassComponent from './components/user-rank';
import FooterCountComponent from './components/footer-count';
import SiteNavigationComponent from './components/site-navigation';
import SortComponent from './components/sort';
import ButtonMoreComponent from './components/button-more';
import ExtraCategories from './components/extra-categories';
import {renderFilmCards} from './components/film-cards-list';
import {
  renderElement,
  updateProfile,
  renderSectionElement,
  renderSectionHeading
} from './utils';
import {BOARD_PRESETS} from './const';
import {generateFilters} from './mock/filter';
import {generateFilms} from './mock/cards';

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
  const userRank = new UserRankClassComponent(userProfile.history);
  renderElement(headerElement, userRank.getElement());
};

const renderFooter = () => {
  const footerCounterContainer = document.querySelector(`.footer__statistics`);
  const footerCounter = new FooterCountComponent(filmsData.length);
  renderElement(footerCounterContainer, footerCounter.getElement());
};

const renderControls = (mainElement) => {
  const filters = generateFilters(userProfile);

  const siteNavigation = new SiteNavigationComponent(filters);
  renderElement(mainElement, siteNavigation.getElement());

  const siteSorting = new SortComponent();
  renderElement(mainElement, siteSorting.getElement());
};

const renderContent = () => {
  const mainElement = document.querySelector(`.main`);
  let initialFilmsCounter = initialRenderedCardsQuantity;

  renderControls(mainElement);

  const filmsSection = renderSectionElement(mainElement, `films`);
  const filmsListSection = renderSectionElement(filmsSection, `films-list`);
  renderSectionHeading(filmsListSection, `All movies. Upcoming`, true);
  renderSectionElement(filmsListSection, `films-list__container`, `div`);

  renderFilmCards(filmsData.slice(0, initialFilmsCounter));

  const buttonMore = new ButtonMoreComponent(filmsData, initialFilmsCounter);
  renderElement(filmsListSection, buttonMore.getElement());

  const extraCategories = new ExtraCategories(filmsSection, filmsData);
  extraCategories.renderExtraCategories();
};

renderHeader();
renderFooter();
renderContent();
