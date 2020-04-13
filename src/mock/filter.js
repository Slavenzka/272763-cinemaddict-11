const filterNames = [
  `All movies`, `Watchlist`, `History`, `Favourites`
];

// TODO apply arguments spread instead of switch
export const generateFilters = (watchlist, history, favourites) => {
  return filterNames.map((filterName) => {
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
