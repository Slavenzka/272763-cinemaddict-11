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

class UserRank extends AbstractSmartComponent {
  constructor() {
    super();
    this._filmsData = null;
    this.userRank = ``;
  }

  getTemplate() {
    return createUserRankTemplate(this.userRank);
  }

  _setUserRankData(filmsModel) {
    this._filmsData = filmsModel.getFilmsAll();
    const watchedCounter = this._filmsData.filter((film) => film.userDetails.alreadyWatched).length;
    this.userRank = getUserRank(watchedCounter);
  }

  updateUserRank(filmsModel) {
    this._setUserRankData(filmsModel);
    this.rerender();
  }

  recoverListeners() {}
}

const userRank = new UserRank();
export default userRank;
