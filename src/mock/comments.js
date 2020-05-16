import {
  getRandomArrayItem,
  getRandomNumberInRange,
  generateRandomTimestamp
} from '../utils/common';
import {COMMENTS, emojis, NAMES} from '../const';

const generateComment = (index) => {
  return {
    id: index + 1,
    text: COMMENTS.slice(0, getRandomNumberInRange(1, 3)).join(` `),
    name: getRandomArrayItem(NAMES),
    emoji: getRandomArrayItem(Object.values(emojis)),
    date: generateRandomTimestamp()
  };
};

export const generateFilmsComments = () => {
  return (new Array(100).fill(``).map((_, index) => generateComment(index)));
};
