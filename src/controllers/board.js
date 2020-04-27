import {render, renderSectionElement, renderSectionHeading} from '../utils/render';
import ButtonMoreComponent from '../components/button-more';
import {BOARD_PRESETS} from '../const';
import {generateFilters} from '../mock/filter';
import SiteNavigationComponent from '../components/site-navigation';
import SortComponent from '../components/sort';
import CardController from '../controllers/movie';
import FilmsComponent from '../components/films';

const {initialRenderedCardsQuantity} = BOARD_PRESETS;

const renderFilmCards = (cards, cardsContainer) => {
  const container = cardsContainer || document.querySelector(`.films-list__container`);
  return cards.map((card) => {
    const filmCardController = new CardController(container);
    filmCardController.render(card);
    return filmCardController;
  });
};

// const renderButtonMore = (container, counter, filmsData) => {
//   const buttonMoreClickHandler = (loadMoreButtonComponent) => {
//     let prevFilmsCount = counter;
//
//     const next = () => {
//       counter += BOARD_PRESETS.additionalCardsQuantity;
//
//       const filmsAdditionalCards = filmsData.slice(prevFilmsCount, counter);
//       renderFilmCards(filmsAdditionalCards);
//
//       prevFilmsCount = counter;
//     };
//
//     const checkAllElementsLoaded = () => {
//       if (counter >= filmsData.length) {
//         loadMoreButtonComponent.removeElement();
//       }
//     };
//
//     return () => {
//       next();
//       checkAllElementsLoaded();
//     };
//   };
//
//   const buttonMore = new ButtonMoreComponent();
//   render(container, buttonMore);
//   buttonMore.handleButtonClick(buttonMoreClickHandler(buttonMore));
//   return buttonMore;
// };

export default class BoardController {
  constructor(container, userProfile) {
    this._container = container;
    this._contentContainer = null;
    this._filmsContainer = null;
    this._cards = null;
    this._initialFilmsCount = initialRenderedCardsQuantity;
    this._filters = generateFilters(userProfile);
    this._navigationComponent = new SiteNavigationComponent(this._filters);
    this._sortComponent = new SortComponent();
    this._buttonMore = new ButtonMoreComponent();

    this._cardsSortHandler = this._cardsSortHandler.bind(this);
  }

  render(cards) {
    this._cards = cards.slice();

    render(this._container, this._navigationComponent);

    render(this._container, this._sortComponent);
    this._sortComponent.setSortTypeChangeHandler(this._cardsSortHandler);

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

    renderFilmCards(this._cards.slice(0, this._initialFilmsCount));

    this._buttonMore = this._addButtonMore();
    this._renderExtraCategories();
  }

  _cardsSortHandler(sortType) {
    let sortableCards = this._cards.slice();
    switch (sortType) {
      case `date`:
        sortableCards = sortableCards.sort((a, b) => a.date < b.date);
        break;
      case `rating`:
        sortableCards = sortableCards.sort((a, b) => a.rating < b.rating);
        break;
      default:
        sortableCards = this._cards.slice();
    }

    const filmsListContainer = this._container.querySelector(`.films-list__container`);
    filmsListContainer.innerHTML = ``;
    this._buttonMore.removeElement();

    renderFilmCards(sortableCards.slice(0, this._initialFilmsCount));
    this._addButtonMore();
  }

  _addButtonMore() {
    // const buttonMoreClickHandler = () => {
    //   let prevFilmsCount = this._initialFilmsCount;
    //
    //   const next = () => {
    //     this._initialFilmsCount += BOARD_PRESETS.additionalCardsQuantity;
    //
    //     const filmsAdditionalCards = filmsData.slice(prevFilmsCount, this._initialFilmsCount);
    //     renderFilmCards(filmsAdditionalCards);
    //
    //     prevFilmsCount = this._initialFilmsCount;
    //   };
    //
    //   const checkAllElementsLoaded = () => {
    //     if (this._initialFilmsCount >= filmsData.length) {
    //       this._buttonMore.removeElement();
    //     }
    //   };
    //
    //   return () => {
    //     next();
    //     checkAllElementsLoaded();
    //   };
    // };
    this._buttonMore.getElement();
    render(this._contentContainer, this._buttonMore);
    // this._buttonMore.addButtonMoreHandler(buttonMoreClickHandler());
  }

  _renderExtraCategories() {
    const renderExtraCategory = (categoryData, categoryName = ``) => {
      const filmsCategory = renderSectionElement(this._contentContainer, `films-list--extra`);
      renderSectionHeading(filmsCategory, categoryName);
      const filmsCategoryList = renderSectionElement(filmsCategory, `films-list__container`, `div`);

      renderFilmCards(categoryData, filmsCategoryList);
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
}
