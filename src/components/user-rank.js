import {filmsModel} from '../main';
import AbstractSmartComponent from './abstract-smart-component';
import {getUserRank} from '../utils/common';

const createUserRankTemplate = (userRank) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${userRank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserRank extends AbstractSmartComponent {
  constructor() {
    super();
    this._filmsData = null;
    this.userRank = null;

    this._setUserRankData();
  }

  getTemplate() {
    return createUserRankTemplate(this.userRank);
  }

  _setUserRankData() {
    this._filmsData = filmsModel.getFilms();
    const watchedCounter = this._filmsData.filter((film) => film.userDetails.alreadyWatched).length;
    this.userRank = getUserRank(watchedCounter);
  }

  updateUserRank() {
    this._setUserRankData();
    this.rerender();
  }

  recoverListeners() {}
}
