import {render, renderSectionElement, renderSectionHeading} from '../utils/render';
import ButtonMoreComponent from '../components/button-more';
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

const renderFilmCards = (cards, cardsContainer) => {
  const container = cardsContainer || document.querySelector(`.films-list__container`);
  cards.forEach((card) => renderCard(card, container));
};

const renderButtonMore = (container, counter, filmsData) => {
  const buttonMoreClickHandler = (loadMoreButtonComponent) => {
    let prevFilmsCount = counter;

    const next = () => {
      counter += BOARD_PRESETS.additionalCardsQuantity;

      const filmsAdditionalCards = filmsData.slice(prevFilmsCount, counter);
      renderFilmCards(filmsAdditionalCards);

      prevFilmsCount = counter;
    };

    const checkAllElementsLoaded = () => {
      if (counter >= filmsData.length) {
        loadMoreButtonComponent.removeElement();
      }
    };

    return () => {
      next();
      checkAllElementsLoaded();
    };
  };

  const buttonMore = new ButtonMoreComponent();
  render(container, buttonMore);
  buttonMore.handleButtonClick(buttonMoreClickHandler(buttonMore));
};

const renderExtraCategories = (container, totalCardsList) => {
  const renderExtraCategory = (cardsList, categoryName = ``) => {
    const filmsCategory = renderSectionElement(container, `films-list--extra`);
    renderSectionHeading(filmsCategory, categoryName);
    const filmsCategoryList = renderSectionElement(filmsCategory, `films-list__container`, `div`);

    renderFilmCards(cardsList, filmsCategoryList);
  };

  const renderTopRatedFilms = () => {
    const categoryData = [...totalCardsList]
      .sort((a, b) => a.rating < b.rating)
      .slice(0, BOARD_PRESETS.extraListCardsQuantity);
    renderExtraCategory(categoryData, `Top rated`);
  };

  const renderTopCommentedFilms = () => {
    const categoryData = [...totalCardsList]
      .sort((a, b) => a.userComments.length < b.userComments.length)
      .slice(0, BOARD_PRESETS.extraListCardsQuantity);
    renderExtraCategory(categoryData, `Most commented`);
  };

  renderTopRatedFilms();
  renderTopCommentedFilms();
};

const renderBoard = (filmsData, mainElement) => {
  let initialFilmsCounter = initialRenderedCardsQuantity;

  renderControls(mainElement);

  const filmsSection = renderSectionElement(mainElement, `films`);
  const filmsListSection = renderSectionElement(filmsSection, `films-list`);
  renderSectionHeading(filmsListSection, `All movies. Upcoming`, [`films-list__title`, `visually-hidden`]);

  if (!filmsData || filmsData.length === 0) {
    renderSectionHeading(filmsListSection, `There are no movies in our database`);
    return;
  }

  renderSectionElement(filmsListSection, `films-list__container`, `div`);
  renderFilmCards(filmsData.slice(0, initialFilmsCounter));
  renderButtonMore(filmsListSection, initialFilmsCounter, filmsData);
  renderExtraCategories(filmsSection, filmsData);
};

export default class BoardController {
  constructor(container) {
    this._container = container;
  }

  render(cards) {
    renderBoard(cards, this._container);
  }
}
