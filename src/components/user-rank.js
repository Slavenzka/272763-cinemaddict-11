import {USER_RANK_PRESETS} from '../const';
import {filmsModel} from '../main';
import AbstractSmartComponent from './abstract-smart-component';

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

export default class UserRank extends AbstractSmartComponent {
  constructor() {
    super();
    this._filmsData = null;
    this._watchedCounter = null;

    this._setUserRankData();
  }

  getTemplate() {
    return createUserRankTemplate(this._watchedCounter);
  }

  _setUserRankData() {
    this._filmsData = filmsModel.getFilms();
    this._watchedCounter = this._filmsData.filter((film) => film.isWatched).length;
  }

  updateUserRank() {
    this._setUserRankData();
    this.rerender();
  }

  recoverListeners() {}
}
