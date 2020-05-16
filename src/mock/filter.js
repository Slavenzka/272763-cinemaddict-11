const FILTERS = [
  {
    name: `all movies`,
  },
  {
    name: `watchlist`,
    count: 0
  },
  {
    name: `history`,
    count: 0
  },
  {
    name: `favorites`,
    count: 0
  }
];

export const generateFilters = (userData) => {
  return FILTERS.map((filter) => {
    filter.count = userData[filter.filterName];
    return filter;
  });
};
