const FILTERS = [
  {
    filterName: `All movies`,
  },
  {
    filterName: `Watchlist`,
    filterCount: 0
  },
  {
    filterName: `History`,
    filterCount: 0
  },
  {
    filterName: `Favourites`,
    filterCount: 0
  }
];

export const generateFilters = (...args) => {
  return FILTERS.map((filter, index) => {
    if (index !== 0) {
      filter.filterCount = args[index - 1];
    }
    return filter;
  });
};
