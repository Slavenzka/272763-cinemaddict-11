const filterNames = [
  `All movies`, `Watchlist`, `History`, `Favourites`
];

export const generateFilters = () => {
  return filterNames.map((item) => ({
    name: item,
    type: item.split(` `)[0].toLowerCase(),
    count: Math.floor(Math.random() * 20)
  }));
};
