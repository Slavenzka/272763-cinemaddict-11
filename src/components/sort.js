import {SortType} from '../const';
import AbstractSmartComponent from './abstract-smart-component';

const createItemsSortTemplate = (activeSortType) => {
  const activeClass = `sort__button--active`;

  return (
    `<ul class="sort">
      <li><a href="#" data-sort-type=${SortType.DEFAULT} class="sort__button ${activeSortType === SortType.DEFAULT ? activeClass : ``}">Sort by default</a></li>
      <li><a href="#" data-sort-type=${SortType.DATE} class="sort__button ${activeSortType === SortType.DATE ? activeClass : ``}">Sort by date</a></li>
      <li><a href="#" data-sort-type=${SortType.RATING} class="sort__button ${activeSortType === SortType.RATING ? activeClass : ``}">Sort by rating</a></li>
    </ul>`
  );
};

export default class Sort extends AbstractSmartComponent {
  constructor() {
    super();
    this._sortType = SortType.DEFAULT;
    this._handleClickItem = null;
  }

  getTemplate() {
    return createItemsSortTemplate(this._sortType);
  }

  getSortType() {
    return this._sortType;
  }

  setSortTypeChangeHandler(handler) {
    this._handleClickItem = handler;
    this._applyClickHandler();
  }

  _applyClickHandler() {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `A`) {
        return;
      }

      if (this._sortType !== evt.target.dataset.sortType) {
        this._sortType = evt.target.dataset.sortType;
        this._handleClickItem(this._sortType);
        this.rerender();
      }
    });
  }

  recoverListeners() {
    this._applyClickHandler();
  }

  resetSorting() {
    this._sortType = SortType.DEFAULT;
    this.rerender();
  }
}
