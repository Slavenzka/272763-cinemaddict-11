export const getRandomArrayItem = (array) => array[Math.floor(Math.random() * array.length)];

export const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

export const getRandomNumberInRange = (min, max, decimalPartLength) => {
  if (!decimalPartLength) {
    return Math.floor(min + Math.random() * (max - min + 1));
  } else {
    return (min + Math.random() * (max - min)).toFixed(1);
  }
};

export const addLeadingZero = (number) => number < 10 ? `0${number}` : `${number}`;

export const getRandomBoolean = () => Math.random() > 0.5;

export const capitalizeFirstLetter = (string) => string.slice(0, 1).toUpperCase() + string.slice(1);

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
