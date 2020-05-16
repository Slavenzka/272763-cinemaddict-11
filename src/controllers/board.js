import {render, renderSectionElement, renderSectionHeading} from '../utils/render';
import ButtonMoreComponent from '../components/button-more';
import {BOARD_PRESETS, RENDER_POSITION, SORT_TYPE} from '../const';
import CardController from '../controllers/movie';
import FilmsComponent from '../components/films';
import {remove} from '../utils/render';
import {modalController} from '../main';

const {initialRenderedCardsQuantity} = BOARD_PRESETS;

const renderFilmCards = (cards, onDataChange, cardsContainer) => {
  const container = cardsContainer || document.querySelector(`.films-list__container`);
  return cards.map((card) => {
    const filmCardController = new CardController(container, onDataChange);
    filmCardController.render(card);
    return filmCardController;
  });
};

const renderTopRatedFilms = (cards, renderExtraCategory) => {
  const categoryData = [...cards]
    .sort((a, b) => a.rating < b.rating)
    .slice(0, BOARD_PRESETS.extraListCardsQuantity);
  renderExtraCategory(categoryData, `Top rated`);
};

const renderTopCommentedFilms = (cards, renderExtraCategory) => {
  const categoryData = [...cards]
    .sort((a, b) => a.comments.length < b.comments.length)
    .slice(0, BOARD_PRESETS.extraListCardsQuantity);
  renderExtraCategory(categoryData, `Most commented`);
};

const getSortedCards = (cards, sortType, to = cards.length) => {
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
  constructor(container, userProfile, filmsModel, sortComponent) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._contentContainer = null;
    this._filmsContainer = null;

    this._shownCardControllers = [];
    this._shownExtraCardControllers = [];
    this._initialFilmsCount = initialRenderedCardsQuantity;
    this._sortComponent = sortComponent;
    this._buttonMore = new ButtonMoreComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._buttonMoreClickHandler = this._buttonMoreClickHandler.bind(this);
    this._updateExtraCategories = this._updateExtraCategories.bind(this);

    this._cardsSortHandler = this._cardsSortHandler.bind(this);
    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      this._clearFilmsContainer();
      this._cardsSortHandler(sortType);
    });
    this._filmsModel.setFilterChangeHandler(this._onFilterChange);
  }

  hide() {
    this._container.hide();
  }

  show() {
    this._container.show();
  }

  render() {
    const cards = this._filmsModel.getFilms();
    this._contentContainer = document.querySelector(`section.films`);

    render(this._container, this._sortComponent, RENDER_POSITION.BEFORENODE, this._contentContainer);

    modalController.setCommentChangeHandler(this._updateExtraCategories);

    this._filmsContainer = new FilmsComponent();
    const filmsContainerElement = this._filmsContainer.getElement();
    render(this._contentContainer, this._filmsContainer);

    renderSectionHeading(filmsContainerElement, `All movies. Upcoming`, [`films-list__title`, `visually-hidden`]);

    if (!cards || cards.length === 0) {
      renderSectionHeading(filmsContainerElement, `There are no movies in our database`);
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
    this._initialFilmsCount = this._shownCardControllers.length;
  }

  _renderExtraFilms(films, container) {
    const newFilms = renderFilmCards(films, this._onDataChange, container);
    this._shownExtraCardControllers = this._shownExtraCardControllers.concat(newFilms);
  }

  _cardsSortHandler(sortType) {
    this._initialFilmsCount = initialRenderedCardsQuantity;

    this._shownCardControllers = renderFilmCards(getSortedCards(this._filmsModel.getFilms(), sortType, this._initialFilmsCount), this._onDataChange);
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
      this._initialFilmsCount += BOARD_PRESETS.additionalCardsQuantity;

      const filmsAdditionalCards = actualCardsState.slice(prevFilmsCount, this._initialFilmsCount);
      this._renderFilms(filmsAdditionalCards);

      prevFilmsCount = this._initialFilmsCount;
    };

    next();
  }

  _renderExtraCategories() {
    const cards = this._filmsModel.getFilms();

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
    const updatedCardControllerIndex = this._shownCardControllers.findIndex((controller) => controller.getCardId() === isUpdated.id);
    const updatedExtraControllerIndex = this._shownExtraCardControllers.findIndex((controller) => controller.getCardId() === isUpdated.id);

    if (isUpdated.status) {
      if (updatedCardControllerIndex !== -1 && updatedExtraControllerIndex === -1) {
        this._shownCardControllers[updatedCardControllerIndex].render(newData);
      } else if (updatedCardControllerIndex === -1 && updatedExtraControllerIndex !== -1) {
        this._shownExtraCardControllers[updatedExtraControllerIndex].render(newData);
      } else if (updatedCardControllerIndex !== -1 && updatedExtraControllerIndex !== -1) {
        this._shownCardControllers[updatedCardControllerIndex].render(newData);
        this._shownExtraCardControllers[updatedExtraControllerIndex].render(newData);
      }
    }
  }

  _updateCards(count) {
    this._clearFilmsContainer();
    this._renderFilms(this._filmsModel.getFilms().slice(0, count));
    this._addButtonMore();
  }

  _updateExtraCategories() {
    this._clearExtraFilmsContainer();
    [...document.querySelectorAll(`.films-list--extra`)].forEach((category) => category.remove());
    this._renderExtraCategories();
  }

  _onFilterChange() {
    this._updateCards(initialRenderedCardsQuantity);
  }
}
