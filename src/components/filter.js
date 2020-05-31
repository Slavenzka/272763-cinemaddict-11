import {capitalizeFirstLetter} from '../utils/common';
import AbstractSmartComponent from './abstract-smart-component';
import filmsScreenWrapper from './films-page';
import sortComponent from './sort';
import statsComponent from './stats';
import filterController from '../controllers/filter';

const createFilterMarkup = ({name, count}, index, activeIndex) => {
  const type = name.split(` `)[0].toLowerCase();
  const isItemActive = activeIndex === index ? `main-navigation__item--active` : ``;
  const itemCount = type !== `all` ? `<span class="main-navigation__item-count">${count}</span>` : ``;
  const processedName = name === `all` ? `All movies` : capitalizeFirstLetter(name);
  return (
    `
      <a href="#${type}" class="main-navigation__item ${isItemActive}" data-item-count=${index}>${processedName} ${itemCount}</a>
    `
  );
};

const createFilterTemplate = (filters, activeItemIndex) => {
  const filtersMarkup = filters.map((item, index) => createFilterMarkup(item, index, activeItemIndex)).join(`\n`);
  const isStatsItemActive = +activeItemIndex === filters.length ? `main-navigation__additional--active` : ``;
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filtersMarkup}
      </div>
      <a href="#stats" class="main-navigation__additional ${isStatsItemActive}" data-item-count=${filters.length}>Stats</a>
    </nav>`
  );
};

export default class FilterComponent extends AbstractSmartComponent {
  constructor(filters, activeIndex, filmsModel) {
    super();
    this._filters = filters;
    this.activeItemIndex = activeIndex || 0;
    this._handleClickItem = null;
    this._filmsModel = filmsModel;
  }

  getTemplate() {
    return createFilterTemplate(this._filters, this.activeItemIndex);
  }

  setFilterChangeHandler(handler) {
    this._handleClickItem = handler;
    this._applyClickHandler();
  }

  recoverListeners() {
    this._applyClickHandler();
  }

  _applyClickHandler() {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `A` && this._activeItemIndex !== +evt.target.dataset.itemCount) {
        const filterName = evt.target.getAttribute(`href`).slice(1);

        if (filterName === `stats`) {
          statsComponent.show(this._filmsModel);
          filmsScreenWrapper.hide();
          sortComponent.hide();
          this._activeItemIndex = +evt.target.dataset.itemCount;
          filterController.activeIndex = +evt.target.dataset.itemCount;
          filterController.render();
        } else {
          statsComponent.hide();
          filmsScreenWrapper.show();
          sortComponent.show();
          sortComponent.resetSorting();
          this._activeItemIndex = +evt.target.dataset.itemCount;
          this._handleClickItem(filterName);
          filterController.activeIndex = +evt.target.dataset.itemCount;
          filterController.render();
        }
      } else if (evt.target.tagName === `SPAN` && this._activeItemIndex !== +evt.target.parentElement.dataset.itemCount) {
        const filterName = evt.target.parentElement.getAttribute(`href`).slice(1);
        this._activeItemIndex = +evt.target.parentElement.dataset.itemCount;
        statsComponent.hide();
        filmsScreenWrapper.show();
        sortComponent.show();
        sortComponent.resetSorting();
        this._handleClickItem(filterName);
        filterController.activeIndex = +evt.target.parentElement.dataset.itemCount;
        filterController.render();
      }
    });
  }
}
