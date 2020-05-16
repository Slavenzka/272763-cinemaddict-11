import {capitalizeFirstLetter} from '../utils/common';
import AbstractComponent from './abstract-component';

const createFilterMarkup = ({name, isActive, count}) => {
  const type = name.split(` `)[0].toLowerCase();
  const isItemActive = isActive ? `main-navigation__item--active` : ``;
  const itemCount = count && type !== `all` ? `<span class="main-navigation__item-count">${count}</span>` : ``;
  const processedName = name === `all` ? `All movies` : capitalizeFirstLetter(name);
  return (
    `
      <a href="#${type}" class="main-navigation__item ${isItemActive}">${processedName} ${itemCount}</a>
    `
  );
};

const createFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((item) => createFilterMarkup(item)).join(`\n`);
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filtersMarkup}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class FilterComponent extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `A`) {
        const filterName = evt.target.getAttribute(`href`).slice(1);
        handler(filterName);
      }
      if (evt.target.tagName === `SPAN`) {
        const filterName = evt.target.parentElement.getAttribute(`href`).slice(1);
        handler(filterName);
      }
    });
  }
}
