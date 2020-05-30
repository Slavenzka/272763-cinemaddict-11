import moment from 'moment';
import {UserRankPresets} from '../const';

export const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

export const addLeadingZero = (number) => number < 10 ? `0${number}` : `${number}`;

export const capitalizeFirstLetter = (string) => string.slice(0, 1).toUpperCase() + string.slice(1);

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
  const {NOVICE, FAN, BUFF} = UserRankPresets;

  if (watchedCount >= NOVICE.min && watchedCount <= NOVICE.max) {
    status = NOVICE.status;
  } else if (watchedCount >= FAN.min && watchedCount <= FAN.max) {
    status = FAN.status;
  } else if (watchedCount >= BUFF.min) {
    status = BUFF.status;
  }
  return status;
};

export const generateRandomString = (requiredLength) => {
  const chars = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789=?!`;
  return new Array(requiredLength)
    .fill(``)
    .map(() => {
      let charIndex = Math.floor(Math.random() * chars.length);
      return chars[charIndex];
    })
    .join(``);
};
