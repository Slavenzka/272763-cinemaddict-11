import {getNodeFromTemplate} from '../utils';
import {BOARD_PRESETS} from '../const';
import {renderFilmCards} from './film-cards-list';
import AbstractComponent from './abstract-component';

const createButtonMoreTemplate = () => (
  `<button class="films-list__show-more">Show more</button>`
);

export default class ButtonMore extends AbstractComponent {
  constructor(filmsData, filmsCount) {
    super();
    this._filmsData = filmsData;
    this._filmsCount = filmsCount;
  }

  getTemplate() {
    return createButtonMoreTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = getNodeFromTemplate(this.getTemplate());
      this.handleButtonClick();
    }
    return this._element;
  }

  handleButtonClick() {
    let prevFilmsCount = this._filmsCount;

    const next = () => {
      this._filmsCount += BOARD_PRESETS.additionalCardsQuantity;

      const filmsAdditionalCards = this._filmsData.slice(prevFilmsCount, this._filmsCount);
      renderFilmCards(filmsAdditionalCards);

      prevFilmsCount = this._filmsCount;
    };

    const checkAllElementsLoaded = () => {
      if (this._filmsCount >= this._filmsData.length) {
        this._element.remove();
        this.removeElement();
      }
    };

    this._element.addEventListener(`click`, () => {
      next();
      checkAllElementsLoaded();
    });
  }
}
