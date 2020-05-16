import moment from 'moment';
import {userRankPresets} from '../const';

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

export const generateRandomTimestamp = () => {
  const getUnixTimestamp = (year) => (year - 1970) * 1000 * 60 * 60 * 24 * 365.25;

  const MIN_YEAR = 1900;
  const MAX_YEAR = (new Date()).getFullYear();

  const minUnix = getUnixTimestamp(MIN_YEAR);
  const maxUnix = getUnixTimestamp(MAX_YEAR + 1);

  return getRandomNumberInRange(minUnix, maxUnix);
};

export const capitalizeFirstLetter = (string) => string.slice(0, 1).toUpperCase() + string.slice(1);

/**
 * A functions which checks if objectToCompare contains all the key-value pairs which constitute
 * the objectTarget
 * @param {object} objectTarget - object, which fields will be non-deeply compared with
 * objectToCompare
 * @param {object} objectToCompare
 * @return {boolean} - true if objectToCompare contains all key-value pairs from objectTarget
 */
export const areObjectsWithEqualFields = (objectTarget, objectToCompare) => {
  let equal = true;
  Object.keys(objectTarget).forEach((key) => {
    if (objectTarget[key] !== objectToCompare[key]) {
      equal = false;
    }
  });
  return equal;
};

export const getDurationFromMinutes = (durationInMinutes) => {
  const hours = moment.duration(durationInMinutes, `minutes`).get(`hours`);
  const minutes = moment.duration(durationInMinutes, `minutes`).get(`minutes`);
  return `${hours > 0 ? `${hours}h ` : ``}${addLeadingZero(minutes)}m`;
};

export const getFullDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

export const getFullDateAndTime = (date) => {
  return moment(date).format(`YYYY/MM/DD hh:mm`);
};

export const getUserRank = (watchedCount) => {
  let status = ``;
  const {NOVICE, FAN, BUFF} = userRankPresets;

  if (watchedCount >= NOVICE.min && watchedCount <= NOVICE.max) {
    status = NOVICE.status;
  } else if (watchedCount >= FAN.min && watchedCount <= FAN.max) {
    status = FAN.status;
  } else if (watchedCount >= BUFF.min) {
    status = BUFF.status;
  }
  return status;
};
