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
    // mock movie team
    const writersPool = shuffleArray(NAMES);
    const actorsPool = shuffleArray(NAMES);

    filmItem.id = `Film item id#${Math.floor(Math.random() * 1000000000)}`;

    filmItem.comments = (new Array(getRandomNumberInRange(0, comments.maxQuantity)))
      .fill(``)
      .map(() => {
        index += 1;
        return index;
      });

    filmItem[`film_info`] = {
      [`title`]: `${filmItem.name}`,
      [`alternative_title`]: `${filmItem.name}`,
      [`total_rating`]: getRandomNumberInRange(0, maxRating, 1),
      [`poster`]: filmItem.poster,
      [`age_rating`]: 18,
      [`director`]: getRandomArrayItem(shuffleArray(NAMES)),
      [`writers`]: (new Array(getRandomNumberInRange(1, 3))).fill(``).map((_, i) => writersPool[i]),
      [`actors`]: (new Array(getRandomNumberInRange(1, 3))).fill(``).map((_, i) => actorsPool[i]),
      [`release`]: {
        [`date`]: moment(generateRandomTimestamp()).format(),
        [`release_country`]: getRandomArrayItem(COUNTRIES)
      },
      [`runtime`]: getRandomNumberInRange(15, 120),
      [`genre`]: (new Array(getRandomNumberInRange(1, maxGenres))).fill(``).map((_, i) => randomGenres[i]),
      [`description`]: shuffleArray(COMMENTS).slice(0, filmDescriptionLength).join(` `)
    };
    filmItem[`user_details`] = {
      [`watchlist`]: getRandomBoolean(),
      [`already_watched`]: getRandomBoolean(),
      [`watching_date`]: moment(generateRandomTimestamp()).format(),
      [`favorite`]: getRandomBoolean()
    };

    return filmItem;
  };

  return new Array(totalCardsQuantity).fill(``).map(() => generateFilm(index));
};
