import AbstractComponent from './abstract-component';
import {SORT_TYPE} from '../const';

const createItemsSortTemplate = () => (
  `<ul class="sort">
    <li><a href="#" data-sort-type=${SORT_TYPE.DEFAULT} class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" data-sort-type=${SORT_TYPE.DATE} class="sort__button">Sort by date</a></li>
    <li><a href="#" data-sort-type=${SORT_TYPE.RATING} class="sort__button">Sort by rating</a></li>
  </ul>`
);

export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._sortType = SORT_TYPE.DEFAULT;
  }

  getTemplate() {
    return createItemsSortTemplate();
  }

  setSortTypeChangeHandler(handler) {
    this._element.addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `A`) {
        return;
      }

      if (this._sortType !== evt.target.dataset.sortType) {
        this._sortType = evt.target.dataset.sortType;
        handler(this._sortType);
      }
    });
  }
}
