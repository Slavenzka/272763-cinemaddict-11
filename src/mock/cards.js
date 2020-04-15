import {
  getRandomNumberInRange,
  getRandomArrayItem,
  shuffleArray,
  getRandomBoolean,
} from './../utils';
import {
  COMMENTS,
  FILMS,
  GENRES,
  COUNTRIES,
  NAMES,
  EMOJIS,
  BOARD_PRESETS,
} from '../const';

const {
  maxGenres,
  comments,
  maxRating
} = BOARD_PRESETS;

const generateRandomTimestamp = () => {
  const getUnixTimestamp = (year) => (year - 1970) * 1000 * 60 * 60 * 24 * 365.25;

  const MIN_YEAR = 1900;
  const MAX_YEAR = (new Date()).getFullYear();

  const minUnix = getUnixTimestamp(MIN_YEAR);
  const maxUnix = getUnixTimestamp(MAX_YEAR + 1);

  return getRandomNumberInRange(minUnix, maxUnix);
};

const generateFilm = () => {
  // shuffle genres array for data mocking
  const randomGenres = shuffleArray(GENRES);
  // copy films object to be mock data container
  const filmItem = Object.assign({}, getRandomArrayItem(FILMS));
  // mock descriptions - both preview and full
  const filmDescriptionLength = getRandomNumberInRange(comments.minPhrasesQuantity, comments.maxPhrasesQuantity);
  let filmDescription = shuffleArray(COMMENTS).slice(0, filmDescriptionLength).join(` `);
  filmItem.description = filmDescription;

  if (filmDescription.length > comments.trimmedCommentLength) {
    filmDescription = filmDescription.slice(0, comments.trimmedCommentLength) + `&#8230;`;
  }

  // mock self explaining properties
  filmItem.nameOriginal = `${filmItem.name}`;
  filmItem.descriptionPreview = filmDescription;
  filmItem.rating = getRandomNumberInRange(0, maxRating, 1);
  filmItem.genres = (new Array(getRandomNumberInRange(1, maxGenres)))
    .fill(``)
    .map((_, index) => randomGenres[index]);
  filmItem.isInWatchlist = getRandomBoolean();
  filmItem.isWatched = getRandomBoolean();
  filmItem.isFavourite = getRandomBoolean();
  filmItem.date = generateRandomTimestamp();
  filmItem.isAdult = getRandomBoolean();
  filmItem.country = getRandomArrayItem(COUNTRIES);
  // mocked runtime is estimated in minutes
  filmItem.runtime = getRandomNumberInRange(15, 120);
  // mock movie team
  const writersPool = shuffleArray(NAMES);
  const actorsPool = shuffleArray(NAMES);

  filmItem.team = {
    director: getRandomArrayItem(shuffleArray(NAMES)),
    writers: (new Array(getRandomNumberInRange(1, 3))).fill(``).map((_, index) => writersPool[index]),
    actors: (new Array(getRandomNumberInRange(1, 5))).fill(``).map((_, index) => actorsPool[index]),
  };

  // mock comments
  filmItem.userComments = (new Array(getRandomNumberInRange(0, comments.maxQuantity)))
    .fill(``)
    .map(() => ({
      text: COMMENTS.slice(0, getRandomNumberInRange(1, 3)).join(` `),
      name: getRandomArrayItem(NAMES),
      emoji: getRandomArrayItem(EMOJIS),
      date: generateRandomTimestamp()
    }));

  return filmItem;
};

export const generateFilms = (totalCardsQuantity) => {
  return new Array(totalCardsQuantity).fill(``).map(() => generateFilm());
};
