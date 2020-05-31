import {render, renderSectionElement, renderSectionHeading} from '../utils/render';
import ButtonMoreComponent from '../components/button-more';
import {BoardPresets, RenderPosition, SortType} from '../const';
import CardController from '../controllers/movie';
import FilmsComponent from '../components/films';
import {remove} from '../utils/render';
import {shuffleArray} from '../utils/common';
import NoData from '../components/no-data-message';
import userRank from '../components/user-rank';
import modalController from '../controllers/modal';

const {INITIAL_RENDERED_CARDS_QUANTITY, EXTRA_LIST_CARDS_QUANTITY} = BoardPresets;

const renderFilmCards = (cards, onDataChange, cardsContainer) => {
  const container = cardsContainer || document.querySelector(`.films-list__container`);
  return cards.map((card) => {
    const filmCardController = new CardController(container, onDataChange);
    filmCardController.render(card);
    return filmCardController;
  });
};

const renderTopRatedFilms = (cards, renderExtraCategory) => {
  const sortedData = [...cards].sort((a, b) => b[`filmInfo`].totalRating - a[`filmInfo`].totalRating);

  if (sortedData[0][`rating`] === 0) {
    return;
  }

  let categoryData;

  if (sortedData[0][`filmInfo`].totalRating === sortedData[sortedData.length - 1][`filmInfo`].totalRating) {
    categoryData = shuffleArray(sortedData).slice(0, EXTRA_LIST_CARDS_QUANTITY);
  } else {
    categoryData = sortedData.slice(0, EXTRA_LIST_CARDS_QUANTITY);
  }

  renderExtraCategory(categoryData, `Top rated`);
};

const renderTopCommentedFilms = (cards, renderExtraCategory) => {
  const sortedData = [...cards].sort((a, b) => b.comments.length - a.comments.length);

  if (sortedData[0][`comments`].length === 0) {
    return;
  }

  let categoryData;

  if (sortedData[0][`comments`].length === sortedData[sortedData.length - 1][`comments`].length) {
    categoryData = shuffleArray(sortedData).slice(0, EXTRA_LIST_CARDS_QUANTITY);
  } else {
    categoryData = sortedData.slice(0, EXTRA_LIST_CARDS_QUANTITY);
  }

  renderExtraCategory(categoryData, `Most commented`);
};

const getSortedCards = (cards, sortTypeActive, to = cards.length) => {
  let sortableCards = cards.slice();
  switch (sortTypeActive) {
    case SortType.DATE:
      sortableCards = sortableCards.sort((a, b) => new Date(b.filmInfo.release.date) - new Date(a.filmInfo.release.date));
      break;
    case SortType.RATING:
      sortableCards = sortableCards.sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
      break;
    default:
      sortableCards = cards;
  }
  return sortableCards.slice(0, to);
};

export default class BoardController {
  constructor(container, filmsModel, sortComponent) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._contentContainer = null;
    this._filmsContainer = null;

    this._shownCardControllers = [];
    this._shownExtraCardControllers = [];
    this._initialFilmsCount = INITIAL_RENDERED_CARDS_QUANTITY;
    this._sortComponent = sortComponent;
    this._buttonMore = new ButtonMoreComponent();
    this._NoDataComponent = new NoData();

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._buttonMoreClickHandler = this._buttonMoreClickHandler.bind(this);
    this._updateExtraCategories = this._updateExtraCategories.bind(this);

    this._cardsSortHandler = this._cardsSortHandler.bind(this);
    this._sortComponent.setSortTypeChangeHandler((activeSortType) => {
      this._clearFilmsContainer();
      this._cardsSortHandler(activeSortType);
      this._addButtonMore();
    });
    this._filmsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const cards = this._filmsModel.getFilms();
    this._contentContainer = document.querySelector(`section.films`);

    render(this._container, this._sortComponent, RenderPosition.BEFORENODE, this._contentContainer);

    modalController.setCommentChangeHandler(this._updateExtraCategories);

    this._filmsContainer = new FilmsComponent();
    const filmsContainerElement = this._filmsContainer.getElement();
    render(this._contentContainer, this._filmsContainer);

    renderSectionHeading(filmsContainerElement, `All movies. Upcoming`, [`films-list__title`, `visually-hidden`]);

    if (!cards || cards.length === 0) {
      render(filmsContainerElement, this._NoDataComponent);
      return;
    }

    renderSectionElement(filmsContainerElement, `films-list__container`, `div`);

    this._renderFilms(cards.slice(0, this._initialFilmsCount));

    this._addButtonMore();
    this._renderExtraCategories();
  }

  _renderFilms(films) {
    const newFilms = renderFilmCards(films, this._onDataChange);
    this._shownCardControllers = this._shownCardControllers.concat(newFilms);
  }

  _renderExtraFilms(films, container) {
    const newFilms = renderFilmCards(films, this._onDataChange, container);
    this._shownExtraCardControllers = this._shownExtraCardControllers.concat(newFilms);
  }

  _cardsSortHandler(activeSortType) {
    this._initialFilmsCount = INITIAL_RENDERED_CARDS_QUANTITY;

    this._shownCardControllers = renderFilmCards(getSortedCards(this._filmsModel.getFilms(), activeSortType, this._initialFilmsCount), this._onDataChange);
  }

  _clearFilmsContainer() {
    this._shownCardControllers.forEach((cardController) => cardController.destroy());
    this._shownCardControllers = [];
  }

  _clearExtraFilmsContainer() {
    this._shownExtraCardControllers.forEach((cardController) => cardController.destroy());
    this._shownExtraCardControllers = [];
  }

  _addButtonMore() {
    remove(this._buttonMore);

    if (this._initialFilmsCount >= this._filmsModel.getFilms().length) {
      return;
    }

    this._buttonMore.getElement();
    render(this._filmsContainer.getElement(), this._buttonMore);
    this._buttonMore.addButtonMoreHandler(this._buttonMoreClickHandler);
  }

  _buttonMoreClickHandler() {
    const cards = this._filmsModel.getFilms();
    const actualCardsState = getSortedCards(cards, this._sortComponent.getSortType());
    let prevFilmsCount = this._initialFilmsCount;

    const next = () => {
      this._initialFilmsCount += BoardPresets.ADDITIONAL_CARDS_QUANTITY;

      const filmsAdditionalCards = actualCardsState.slice(prevFilmsCount, this._initialFilmsCount);
      this._renderFilms(filmsAdditionalCards);

      prevFilmsCount = this._initialFilmsCount;
      this._addButtonMore();
    };

    next();
  }

  _renderExtraCategories() {
    const cards = this._filmsModel.getFilmsAll();

    const renderExtraCategory = (categoryData, categoryName = ``) => {
      const filmsCategory = renderSectionElement(this._contentContainer, `films-list--extra`);
      renderSectionHeading(filmsCategory, categoryName);
      const filmsCategoryList = renderSectionElement(filmsCategory, `films-list__container`, `div`);
      this._renderExtraFilms(categoryData, filmsCategoryList);
    };

    renderTopRatedFilms(cards, renderExtraCategory);
    renderTopCommentedFilms(cards, renderExtraCategory);
  }

  _onDataChange(oldData, newData) {
    const isUpdated = this._filmsModel.updateFilm(oldData.id, newData);

    if (isUpdated.status) {
      this._updateCards(this._initialFilmsCount);
      userRank.updateUserRank(this._filmsModel);
      this._removeExtraCategories();
      this._renderExtraCategories();
    }
  }

  _updateCards(count) {
    this._clearFilmsContainer();

    const filmCards = getSortedCards(this._filmsModel.getFilms());

    if (filmCards.length === 0) {
      render(this._filmsContainer.getElement(), this._NoDataComponent);
      remove(this._buttonMore);
    } else {
      remove(this._NoDataComponent);
      this._renderFilms(filmCards.slice(0, count));
      this._addButtonMore();
    }
  }

  _updateExtraCategories() {
    this._clearExtraFilmsContainer();
    [...document.querySelectorAll(`.films-list--extra`)].forEach((category) => category.remove());
    this._renderExtraCategories();
  }

  _onFilterChange() {
    this._initialFilmsCount = BoardPresets.INITIAL_RENDERED_CARDS_QUANTITY;
    this._updateCards(INITIAL_RENDERED_CARDS_QUANTITY);
    this._addButtonMore();
  }

  _removeExtraCategories() {
    [...this._contentContainer.querySelectorAll(`.films-list--extra`)].forEach((category) => category.remove());
  }
}
