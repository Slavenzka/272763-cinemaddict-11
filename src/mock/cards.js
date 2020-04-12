import {getRandomNumberInRange, getRandomArrayItem, shuffleArray} from './../utils';
import {
  COMMENTS,
  FILMS,
  MAX_RATING,
  MIN_COMMENTS_COUNT,
  TRIMMED_COMMENT_LENGTH,
  GENRES,
  MAX_GENRES_COUNT,
  COUNTRIES,
  NAMES,
  MAX_USER_COMMENTS,
  EMOJIS,
} from '../const';

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
  const filmDescriptionLength = getRandomNumberInRange(MIN_COMMENTS_COUNT, MAX_USER_COMMENTS);
  let filmDescription = shuffleArray(COMMENTS).slice(0, filmDescriptionLength).join(` `);
  filmItem.description = filmDescription;

  if (filmDescription.length > TRIMMED_COMMENT_LENGTH) {
    filmDescription = filmDescription.slice(0, TRIMMED_COMMENT_LENGTH) + `&#8230;`;
  }

  // mock self explaining properties
  filmItem.nameOriginal = `${filmItem.name}`;
  filmItem.descriptionPreview = filmDescription;
  filmItem.rating = getRandomNumberInRange(0, MAX_RATING, 1);
  filmItem.genres = (new Array(getRandomNumberInRange(1, MAX_GENRES_COUNT)))
    .fill(``)
    .map((_, index) => randomGenres[index]);
  filmItem.isInWatchlist = Math.random() > 0.5;
  filmItem.isWatched = Math.random() > 0.5;
  filmItem.isFavourite = Math.random() > 0.5;
  filmItem.date = generateRandomTimestamp();
  filmItem.isAdult = Math.random() > 0.5;
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
  filmItem.userComments = (new Array(getRandomNumberInRange(0, MAX_USER_COMMENTS)))
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
