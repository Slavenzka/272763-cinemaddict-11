export const BOARD_PRESETS = {
  totalCardsQuantity: 13,
  initialRenderedCardsQuantity: 5,
  additionalCardsQuantity: 5,
  extraListCardsQuantity: 2,
  maxRating: 10,
  maxGenres: 3,
  comments: {
    minPhrasesQuantity: 1,
    maxPhrasesQuantity: 6,
    maxQuantity: 6,
    trimmedCommentLength: 139,
  },
};
export const USER_RANK_PRESETS = {
  novice: {
    min: 2,
    max: 10
  },
  fan: {
    min: 11,
    max: 20
  },
  buff: {
    min: 21
  }
};

export const FILMS = [
  {
    name: `The Dance of Life`,
    poster: `the-dance-of-life.jpg`
  },
  {
    name: `Sagebrush Trail`,
    poster: `sagebrush-trail.jpg`
  },
  {
    name: `The Man with the Golden Arm`,
    poster: `the-man-with-the-golden-arm.jpg`
  },
  {
    name: `Santa Claus Conquers the Martians`,
    poster: `santa-claus-conquers-the-martians.jpg`
  },
  {
    name: `Popeye the Sailor Meets Sindbad the Sailor`,
    poster: `popeye-meets-sinbad.jpg`
  },
  {
    name: `The Great Flamarion`,
    poster: `the-great-flamarion.jpg`
  },
  {
    name: `Made for Each Other`,
    poster: `made-for-each-other.jpg`
  },
];

export const GENRES = [
  `Musical`,
  `Western`,
  `Drama`,
  `Comedy`,
  `Cartoon`,
  `Mystery`,
  `Horror`,
  `Film-Noir`
];

export const COMMENTS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

export const COUNTRIES = [
  `USA`,
  `France`,
  `Germany`,
  `Italy`,
];

export const NAMES = [
  `Anthony Mann`,
  `Anne Wigton`,
  `Heinz Herald`,
  `Richard Weil`,
  `Erich von Stroheim`,
  `Mary Beth Hughes`,
  `Dan Duryea`,
  `Tim Macoveev`,
  `John Doe`
];

export const emojis = {
  SMILE: `smile`,
  SLEEPING: `sleeping`,
  PUKE: `puke`,
  ANGRY: `angry`
};

export const RENDER_POSITION = {
  BEFOREEND: `beforeend`,
  AFTERBEGIN: `afterbegin`
};

export const SORT_TYPE = {
  DATE: `date`,
  RATING: `rating`,
  DEFAULT: `default`
};

export const KEY_CODES = {
  enter: 13,
  control: 17,
  escape: 27
};

export const FilterTypes = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`
};
