import {RENDER_POSITION} from '../const';

export const render = (container, content, position = `beforeend`) => {
  container.insertAdjacentHTML(position, content);
};

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

export const renderSectionElement = (container, className, type = `section`) => {
  const sectionElement = document.createElement(type);
  sectionElement.classList.add(className);
  container.appendChild(sectionElement);

  return container.querySelector(`.${className}:last-of-type`);
};

export const renderSectionHeading = (container, text = ``, hidden = false) => {
  const sectionHeading = document.createElement(`h2`);
  sectionHeading.classList.add(`films-list__title`);
  if (hidden) {
    sectionHeading.classList.add(`visually-hidden`);
  }
  sectionHeading.textContent = text;
  container.appendChild(sectionHeading);
};

export const getNodeFromTemplate = (template) => {
  const node = document.createElement(`div`);
  node.innerHTML = template;

  return node.firstChild;
};

export const renderElement = (container, element, position = RENDER_POSITION.BEFOREEND) => {
  switch (position) {
    case `afterbegin`:
      container.prepend(element);
      break;
    default:
      container.append(element);
      break;
  }
};
