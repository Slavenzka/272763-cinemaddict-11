const createFilterMarkup = (name, type, isActive, count) => {
  const isItemActive = isActive ? `main-navigation__item--active` : ``;
  const itemCount = count && type !== `all` ? `<span class="main-navigation__item-count">${count}</span>` : ``;

  return (
    `
      <a href="#${type}" class="main-navigation__item ${isItemActive}">${name} ${itemCount}</a>
    `
  );
};

export const createSiteNavTemplate = (filters) => {
  const filtersMarkup = filters.map(({name, type, count}, index) => createFilterMarkup(name, type, index === 0, count)).join(`\n`);
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filtersMarkup}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};
