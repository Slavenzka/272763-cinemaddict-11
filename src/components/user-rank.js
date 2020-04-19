import {USER_RANK_PRESETS} from '../const';
import {getNodeFromTemplate} from '../utils';

const createUserRankTemplate = (watchedMoviesQuantity) => {
  let status = ``;
  const {novice, fan, buff} = USER_RANK_PRESETS;

  if (watchedMoviesQuantity >= novice.min && watchedMoviesQuantity <= novice.max) {
    status = `Novice`;
  } else if (watchedMoviesQuantity >= fan.min && watchedMoviesQuantity <= fan.max) {
    status = `Fan`;
  } else if (watchedMoviesQuantity >= buff.min) {
    status = `Movie Buff`;
  }
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${status}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserRank {
  constructor(watchedMoviesQuantity) {
    this._watchedCounter = watchedMoviesQuantity;
    this._element = null;
  }

  getTemplate() {
    return createUserRankTemplate(this._watchedCounter);
  }

  getElement() {
    if (!this._element) {
      this._element = getNodeFromTemplate(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
