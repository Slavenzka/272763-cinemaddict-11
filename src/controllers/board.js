import {render, renderSectionElement, renderSectionHeading} from '../utils/render';
import ButtonMoreComponent from '../components/button-more';
import ExtraCategories from '../components/extra-categories';
import {BOARD_PRESETS} from '../const';
import {generateFilters} from '../mock/filter';
import SiteNavigationComponent from '../components/site-navigation';
import SortComponent from '../components/sort';
import {userProfile} from '../main';
import FilmCardComponent from '../components/film-card';

const {initialRenderedCardsQuantity} = BOARD_PRESETS;

const renderControls = (mainElement) => {
  const filters = generateFilters(userProfile);

  const siteNavigation = new SiteNavigationComponent(filters);
  render(mainElement, siteNavigation);

  const siteSorting = new SortComponent();
  render(mainElement, siteSorting);
};

const renderCard = (cardData, container) => {
  const filmCard = new FilmCardComponent(cardData);
  render(container, filmCard);
};

export const renderFilmCards = (cards, cardsContainer) => {
  const container = cardsContainer || document.querySelector(`.films-list__container`);
  cards.forEach((card) => renderCard(card, container));
};

const renderBoard = (filmsData, mainElement) => {
  let initialFilmsCounter = initialRenderedCardsQuantity;

  renderControls(mainElement);

  const filmsSection = renderSectionElement(mainElement, `films`);
  const filmsListSection = renderSectionElement(filmsSection, `films-list`);
  renderSectionHeading(filmsListSection, `All movies. Upcoming`, true);

  if (!filmsData || filmsData.length === 0) {
    renderSectionHeading(filmsListSection, `There are no movies in our database`);
    return;
  }

  renderSectionElement(filmsListSection, `films-list__container`, `div`);

  renderFilmCards(filmsData.slice(0, initialFilmsCounter));

  const buttonMore = new ButtonMoreComponent(filmsData, initialFilmsCounter);
  render(filmsListSection, buttonMore);

  const extraCategories = new ExtraCategories(filmsSection, filmsData);
  extraCategories.renderExtraCategories();
};

export default class BoardController {
  constructor(container) {
    this._container = container;
  }

  render(cards) {
    renderBoard(cards, this._container);
  }
}
