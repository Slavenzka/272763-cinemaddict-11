import {render, renderSectionElement, renderSectionHeading} from '../utils/render';
import ButtonMoreComponent from '../components/button-more';
import {BOARD_PRESETS} from '../const';
import {generateFilters} from '../mock/filter';
import SiteNavigationComponent from '../components/site-navigation';
import SortComponent from '../components/sort';
import FilmCardComponent from '../components/film-card';

const {initialRenderedCardsQuantity} = BOARD_PRESETS;

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
  return buttonMore;
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
  const filmsSection = renderSectionElement(mainElement, `films`);
  const filmsListSection = renderSectionElement(filmsSection, `films-list`);
  renderSectionHeading(filmsListSection, `All movies. Upcoming`, [`films-list__title`, `visually-hidden`]);

  if (!filmsData || filmsData.length === 0) {
    renderSectionHeading(filmsListSection, `There are no movies in our database`);
    return;
  }

  renderSectionElement(filmsListSection, `films-list__container`, `div`);
};

export default class BoardController {
  constructor(container, userProfile) {
    this._container = container;
    this._filters = generateFilters(userProfile);
    this._navigationComponent = new SiteNavigationComponent(this._filters);
    this._sortComponent = new SortComponent();
    this._buttonMore = null;
  }

  render(cards) {
    let filmCards = cards.slice();
    let initialFilmsCounter = initialRenderedCardsQuantity;

    const cardsSortHandler = (sortType) => {
      switch (sortType) {
        case `date`:
          filmCards = filmCards.sort((a, b) => a.date < b.date);
          break;
        case `rating`:
          filmCards = filmCards.sort((a, b) => a.rating < b.rating);
          break;
        default:
          filmCards = cards.slice();
      }

      const filmsListContainer = this._container.querySelector(`.films-list__container`);
      filmsListContainer.innerHTML = ``;
      this._buttonMore.removeElement();

      renderFilmCards(filmCards.slice(0, initialFilmsCounter));
      this._buttonMore = renderButtonMore(filmsListSection, initialFilmsCounter, filmCards);
    };

    render(this._container, this._navigationComponent);
    render(this._container, this._sortComponent);
    this._sortComponent.setSortTypeChangeHandler(cardsSortHandler);
    renderBoard(filmCards, this._container);
    renderFilmCards(filmCards.slice(0, initialFilmsCounter));

    const filmsListSection = this._container.querySelector(`.films-list`);
    const filmsSection = this._container.querySelector(`.films`);
    this._buttonMore = renderButtonMore(filmsListSection, initialFilmsCounter, filmCards);
    renderExtraCategories(filmsSection, filmCards);
  }
}
