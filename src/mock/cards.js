import {
  getRandomNumberInRange,
  getRandomArrayItem,
  shuffleArray,
  getRandomBoolean,
  generateRandomTimestamp
} from '../utils/common';
import {
  COMMENTS,
  FILMS,
  GENRES,
  COUNTRIES,
  NAMES,
  BOARD_PRESETS,
} from '../const';
import moment from 'moment';

const {
  maxGenres,
  comments,
  maxRating
} = BOARD_PRESETS;

export const generateFilms = (totalCardsQuantity) => {
  let index = 0;

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
    filmItem.id = `Film item id#${Math.floor(Math.random() * 1000000000)}`;
    filmItem.nameOriginal = `${filmItem.name}`;
    filmItem.descriptionPreview = filmDescription;
    filmItem.rating = getRandomNumberInRange(0, maxRating, 1);
    filmItem.genres = (new Array(getRandomNumberInRange(1, maxGenres)))
      .fill(``)
      .map((_, i) => randomGenres[i]);
    filmItem.date = generateRandomTimestamp();
    filmItem.isAdult = getRandomBoolean();
    filmItem.country = getRandomArrayItem(COUNTRIES);
    // mocked runtime is estimated in minutes
    filmItem.runtime = getRandomNumberInRange(15, 120);
    // mock movie team
    const writersPool = shuffleArray(NAMES);
    const actorsPool = shuffleArray(NAMES);
    filmItem[`user_details`] = {
      [`watchlist`]: getRandomBoolean(),
      [`already_watched`]: getRandomBoolean(),
      [`watching_date`]: moment(generateRandomTimestamp()).format(),
      [`favorite`]: getRandomBoolean()
    };

    filmItem.team = {
      director: getRandomArrayItem(shuffleArray(NAMES)),
      writers: (new Array(getRandomNumberInRange(1, 3))).fill(``).map((_, i) => writersPool[i]),
      actors: (new Array(getRandomNumberInRange(1, 5))).fill(``).map((_, i) => actorsPool[i]),
    };

    // mock comments
    filmItem.comments = (new Array(getRandomNumberInRange(0, comments.maxQuantity)))
      .fill(``)
      .map(() => {
        index += 1;
        return index;
      });

    return filmItem;
  };

  return new Array(totalCardsQuantity).fill(``).map(() => generateFilm(index));
};
