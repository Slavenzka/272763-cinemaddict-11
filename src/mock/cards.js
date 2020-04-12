import {getRandomNumberInRange, getRandomArrayItem, shuffleArray} from './../utils';
import {
  COMMENTS,
  FILMS,
  MAX_COMMENTS_COUNT,
  MAX_RATING,
  MIN_COMMENTS_COUNT,
  TRIMMED_COMMENT_LENGTH,
} from '../const';

const generateFilm = () => {
  const filmItem = Object.assign({}, getRandomArrayItem(FILMS));
  // get the descriptionLines
  const filmDescriptionLength = getRandomNumberInRange(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT);
  let filmDescription = shuffleArray(COMMENTS).slice(0, filmDescriptionLength).join(` `);
  filmItem.description = filmDescription;

  if (filmDescription.length > TRIMMED_COMMENT_LENGTH) {
    filmDescription = filmDescription.slice(0, TRIMMED_COMMENT_LENGTH) + `&#8230;`;
  }

  filmItem.descriptionPreview = filmDescription;
  filmItem.rating = getRandomNumberInRange(0, MAX_RATING, 1);
  filmItem.commentCount = getRandomNumberInRange(0, 5);
  filmItem.isInWatchlist = Math.random() > 0.5;
  filmItem.isWatched = Math.random() > 0.5;
  filmItem.isFavourite = Math.random() > 0.5;

  return filmItem;
};

export const generateFilms = (totalCardsQuantity) => {
  return new Array(totalCardsQuantity).fill(``).map(() => generateFilm());
};
