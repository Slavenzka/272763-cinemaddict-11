import {render, renderSectionElement, renderSectionHeading} from '../utils/render';
import ButtonMoreComponent from '../components/button-more';
import {BOARD_PRESETS, SORT_TYPE} from '../const';
import {generateFilters} from '../mock/filter';
import SiteNavigationComponent from '../components/site-navigation';
import SortComponent from '../components/sort';
import CardController from '../controllers/movie';
import FilmsComponent from '../components/films';

const {initialRenderedCardsQuantity} = BOARD_PRESETS;

const renderFilmCards = (cards, onDataChange, onViewChange, cardsContainer) => {
  const container = cardsContainer || document.querySelector(`.films-list__container`);
  return cards.map((card) => {
    const filmCardController = new CardController(container, onDataChange, onViewChange);
    filmCardController.render(card);
    return filmCardController;
  });
};

const getSortedCards = (cards, sortType, to = cards.length - 1) => {
  let sortableCards = cards.slice();
  switch (sortType) {
    case SORT_TYPE.DATE:
      sortableCards = sortableCards.sort((a, b) => a.date < b.date);
      break;
    case SORT_TYPE.RATING:
      sortableCards = sortableCards.sort((a, b) => a.rating < b.rating);
      break;
    default:
      sortableCards = cards;
  }
  return sortableCards.slice(0, to);
};

export default class BoardController {
  constructor(container, userProfile) {
    this._container = container;
    this._contentContainer = null;
    this._filmsContainer = null;
    this._cards = null;
    this._shownCardControllers = [];
    this._initialFilmsCount = initialRenderedCardsQuantity;
    this._filters = generateFilters(userProfile);
    this._navigationComponent = new SiteNavigationComponent(this._filters);
    this._sortComponent = new SortComponent();
    this._buttonMore = new ButtonMoreComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._cardsSortHandler = this._cardsSortHandler.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._cardsSortHandler);
  }

  render(cards) {
    this._cards = cards;

    render(this._container, this._navigationComponent);
    render(this._container, this._sortComponent);

    this._contentContainer = renderSectionElement(this._container, `films`);

    this._filmsContainer = new FilmsComponent();
    const filmsContainerElement = this._filmsContainer.getElement();
    render(this._contentContainer, this._filmsContainer);

    renderSectionHeading(filmsContainerElement, `All movies. Upcoming`, [`films-list__title`, `visually-hidden`]);

    if (!this._cards || this._cards.length === 0) {
      renderSectionHeading(filmsContainerElement, `There are no movies in our database`);
      return;
    }

    renderSectionElement(filmsContainerElement, `films-list__container`, `div`);

    const newCardControllers = renderFilmCards(this._cards.slice(0, this._initialFilmsCount), this._onDataChange, this._onViewChange);
    this._shownCardControllers = this._shownCardControllers.concat(newCardControllers);

    this._addButtonMore();
    this._renderExtraCategories();
  }

  _cardsSortHandler(sortType) {
    const filmsListContainer = this._container.querySelector(`.films-list__container`);
    filmsListContainer.innerHTML = ``;
    this._initialFilmsCount = initialRenderedCardsQuantity;

    const newCardControllers = renderFilmCards(getSortedCards(this._cards, sortType, this._initialFilmsCount), this._onDataChange, this._onViewChange);
    this._shownCardControllers = [...newCardControllers];
  }

  _addButtonMore() {
    const buttonMoreClickHandler = () => {
      const actualCardsState = getSortedCards(this._cards, this._sortComponent.getSortType());
      let prevFilmsCount = this._initialFilmsCount;

      const next = () => {
        this._initialFilmsCount += BOARD_PRESETS.additionalCardsQuantity;

        const filmsAdditionalCards = actualCardsState.slice(prevFilmsCount, this._initialFilmsCount);
        const newCardControllers = renderFilmCards(filmsAdditionalCards, this._onDataChange, this._onViewChange);
        this._shownCardControllers = this._shownCardControllers.concat(newCardControllers);

        prevFilmsCount = this._initialFilmsCount;
      };

      const checkAllElementsLoaded = () => {
        if (this._initialFilmsCount >= this._cards.length) {
          this._buttonMore.removeElement();
        }
      };

      next();
      checkAllElementsLoaded();
    };
    this._buttonMore.getElement();
    render(this._contentContainer, this._buttonMore);
    this._buttonMore.addButtonMoreHandler(buttonMoreClickHandler);
  }

  _renderExtraCategories() {
    const renderExtraCategory = (categoryData, categoryName = ``) => {
      const filmsCategory = renderSectionElement(this._contentContainer, `films-list--extra`);
      renderSectionHeading(filmsCategory, categoryName);
      const filmsCategoryList = renderSectionElement(filmsCategory, `films-list__container`, `div`);

      const newCardControllers = renderFilmCards(categoryData, this._onDataChange, this._onViewChange, filmsCategoryList);
      this._shownCardControllers = this._shownCardControllers.concat(newCardControllers);
    };

    const renderTopRatedFilms = () => {
      const categoryData = [...this._cards]
        .sort((a, b) => a.rating < b.rating)
        .slice(0, BOARD_PRESETS.extraListCardsQuantity);
      renderExtraCategory(categoryData, `Top rated`);
    };

    const renderTopCommentedFilms = () => {
      const categoryData = [...this._cards]
        .sort((a, b) => a.userComments.length < b.userComments.length)
        .slice(0, BOARD_PRESETS.extraListCardsQuantity);
      renderExtraCategory(categoryData, `Most commented`);
    };

    renderTopRatedFilms();
    renderTopCommentedFilms();
  }

  _onDataChange(oldData, newData) {
    const index = this._cards.findIndex((card) => card === oldData);

    if (index === -1) {
      return;
    }

    this._cards = [].concat(this._cards.slice(0, index), newData, this._cards.slice(index + 1));
    this._shownCardControllers[index].render(this._cards[index]);
  }

  _onViewChange() {
    this._shownCardControllers.forEach((it) => it.setDefaultView());
  }
}
