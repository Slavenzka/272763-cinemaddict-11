import {capitalizeFirstLetter, getNodeFromTemplate} from '../utils';

const createFilterMarkup = (name, isActive, count) => {
  const type = name.split(` `)[0].toLowerCase();
  const isItemActive = isActive ? `main-navigation__item--active` : ``;
  const itemCount = count && type !== `all` ? `<span class="main-navigation__item-count">${count}</span>` : ``;
  return (
    `
      <a href="#${type}" class="main-navigation__item ${isItemActive}">${capitalizeFirstLetter(name)} ${itemCount}</a>
    `
  );
};

const createSiteNavTemplate = (filters) => {
  const filtersMarkup = filters.map((item, index) => createFilterMarkup(item.filterName, index === 0, item.filterCount)).join(`\n`);
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filtersMarkup}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class SiteNavigation {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createSiteNavTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = getNodeFromTemplate(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
