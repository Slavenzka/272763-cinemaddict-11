import {getNodeFromTemplate} from '../utils';
import {BOARD_PRESETS} from '../const';
import {renderFilmCards} from './film-cards-list';

const createButtonMoreTemplate = () => (
  `<button class="films-list__show-more">Show more</button>`
);

export default class ButtonMore {
  constructor(filmsData, filmsCount) {
    this._filmsData = filmsData;
    this._filmsCount = filmsCount;
    this._element = null;
  }

  getTemplate() {
    return createButtonMoreTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = getNodeFromTemplate(this.getTemplate());
      this.addEventListener();
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  addEventListener() {
    let prevFilmsCount = this._filmsCount;

    const next = () => {
      this._filmsCount += BOARD_PRESETS.additionalCardsQuantity;

      const filmsAdditionalCards = this._filmsData.slice(prevFilmsCount, this._filmsCount)
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
