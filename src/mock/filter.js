const FILTERS = [
  {
    filterName: `All movies`,
  },
  {
    filterName: `watchlist`,
    filterCount: 0
  },
  {
    filterName: `history`,
    filterCount: 0
  },
  {
    filterName: `favorites`,
    filterCount: 0
  }
];

export const generateFilters = (userData) => {
  return FILTERS.map((filter) => {
    filter.filterCount = userData[filter.filterName];
    return filter;
  });
};
