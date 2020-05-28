export const BoardPresets = {
  INITIAL_RENDERED_CARDS_QUANTITY: 5,
  ADDITIONAL_CARDS_QUANTITY: 5,
  EXTRA_LIST_CARDS_QUANTITY: 2,
  COMMENTS: {
    minPhrasesQuantity: 1,
    maxPhrasesQuantity: 6,
    maxQuantity: 6,
    trimmedCommentLength: 139,
  },
};
export const UserRankPresets = {
  NOVICE: {
    min: 2,
    max: 10,
    status: `Novice`
  },
  FAN: {
    min: 11,
    max: 20,
    status: `Fan`
  },
  BUFF: {
    min: 21,
    status: `Movie Buff`
  }
};

export const RenderPosition = {
  BEFOREEND: `beforeend`,
  AFTERBEGIN: `afterbegin`,
  BEFORENODE: `beforenode`
};

export const SortType = {
  DATE: `date`,
  RATING: `rating`,
  DEFAULT: `default`
};

export const KeyCodes = {
  enter: 13,
};

export const FilterTypes = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`
};

export const StatsFilterTypes = {
  ALL: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};

export const DeleteButtonLabels = {
  REGULAR: `Delete`,
  FETCHING: `Deleting...`
};

export const DIAGRAM_BAR_HEIGHT = 50;
