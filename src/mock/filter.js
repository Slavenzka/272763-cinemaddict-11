const FILTER_NAMES = [
  `All movies`, `Watchlist`, `History`, `Favourites`
];

// TODO apply arguments spread instead of switch
export const generateFilters = (watchlist, history, favourites) => {
  return FILTER_NAMES.map((filterName) => {
    switch (filterName) {
      case `All movies`:
        return {
          filterName
        };
      case `Watchlist`:
        return {
          filterName,
          filterCount: watchlist
        };
      case `History`:
        return {
          filterName,
          filterCount: history
        };
      case `Favourites`:
        return {
          filterName,
          filterCount: favourites
        };
      default:
        return null;
    }
  });
};
