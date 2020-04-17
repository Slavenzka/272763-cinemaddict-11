import {renderSectionElement, renderSectionHeading} from '../utils';
import {renderFilmCards} from '../components/film-cards-list';
import {BOARD_PRESETS} from '../const';

export default class ExtraCategories {
  constructor(container, totalCardsList) {
    this._container = container;
    this._totalCardsList = totalCardsList;
  }

  renderExtraCategory(cardsList, categoryName = ``) {
    const filmsCategory = renderSectionElement(this._container, `films-list--extra`);
    renderSectionHeading(filmsCategory, categoryName);
    const filmsCategoryList = renderSectionElement(filmsCategory, `films-list__container`, `div`);

    renderFilmCards(cardsList, filmsCategoryList);
  }

  renderTopRatedFilms() {
    const categoryData = [...this._totalCardsList]
      .sort((a, b) => a.rating < b.rating)
      .slice(0, BOARD_PRESETS.extraListCardsQuantity);
    this.renderExtraCategory(categoryData, `Top rated`);
  }

  renderTopCommentedFilms() {
    const categoryData = [...this._totalCardsList]
      .sort((a, b) => a.userComments.length < b.userComments.length)
      .slice(0, BOARD_PRESETS.extraListCardsQuantity);
    this.renderExtraCategory(categoryData, `Most commented`);
  }

  renderExtraCategories() {
    this.renderTopRatedFilms();
    this.renderTopCommentedFilms();
  }
}
