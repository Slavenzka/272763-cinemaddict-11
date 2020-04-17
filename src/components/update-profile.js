export const updateProfile = (filmsData, userProfile) => {
  filmsData.forEach((film) => {
    if (film.isInWatchlist) {
      userProfile.watchlist += 1;
    }
    if (film.isWatched) {
      userProfile.history += 1;
    }
    if (film.isFavourite) {
      userProfile.favourites += 1;
    }
  });
};
