const FILTER_NAMES = [
  `All movies`, `Watchlist`, `History`, `Favourites`
];

// TODO apply arguments spread instead of switch
export const generateFilters = (watchlist, history, favourites) => {
  return FILTER_NAMES.map((filterName) => {
    switch (filterName) {
      case `All movies`:
        return {
          [filterName]: null
        };
      case `Watchlist`:
        return {
          [filterName]: watchlist
        };
      case `History`:
        return {
          [filterName]: history
        };
      case `Favourites`:
        return {
          [filterName]: favourites
        };
    }
    return null;
  });
};
