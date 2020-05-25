import FilmCardComponent from '../components/film-card';
import {render} from '../utils/render';
import {replace, remove} from '../utils/render';
import {api, modalController} from '../main';

export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this.component = null;
    this._card = null;
    this._onDataChange = onDataChange;
    this._modalController = null;

    this._controlButtonClickHandler = this._controlButtonClickHandler.bind(this);
  }

  render(card) {
    const oldCardComponent = this.component;
    this.component = new FilmCardComponent(card);
    this._card = card;

    if (oldCardComponent) {
      replace(this.component, oldCardComponent);
      this.component.setCardHandler(() => this._renderModal(this._card));
    } else {
      render(this._container, this.component);
      this.component.setCardHandler(() => this._renderModal(this._card));
    }

    this.component.setWatchlistButtonHandler(() => {
      this._controlButtonClickHandler(`watchlist`);
    });

    this.component.setWatchedButtonHandler(() => {
      this._controlButtonClickHandler(`alreadyWatched`);
    });

    this.component.setFavoriteButtonHandler(() => {
      this._controlButtonClickHandler(`favorite`);
    });
  }

  getCardId() {
    return this._card.id;
  }

  destroy() {
    remove(this.component);
  }

  _renderModal(card) {
    this._modalController = modalController;
    this._modalController.render(this._controlButtonClickHandler, this._onDataChange, card.id);
  }

  _controlButtonClickHandler(type) {
    const copyUserData = Object.assign({}, this._card.userDetails);
    copyUserData[type] = !this._card.userDetails[type];
    const updatedFilmData = Object.assign({}, this._card, {
      userDetails: copyUserData
    });

    this._onDataChange(this._card, Object.assign({}, this._card, {
      userDetails: copyUserData
    }));

    api.updateFilm(this._card.id, this._getServerFormattedData(updatedFilmData))
      .then((response) => console.log(response));
  }

  _getServerFormattedData() {
    return {
      id: this._card.id,
      comments: this._card.comments,
      [`film_info`]: {
        title: this._card.filmInfo.title,
        [`alternative_title`]: this._card.filmInfo.alternativeTitle,
        [`total_rating`]: this._card.filmInfo.totalRating,
        poster: this._card.filmInfo.poster,
        [`age_rating`]: this._card.filmInfo.ageRating,
        director: this._card.director,
        writers: this._card.filmInfo.writers,
        actors: this._card.filmInfo.actors,
        release: {
          date: this._card.filmInfo.release.date,
          [`release_country`]: this._card.filmInfo.release.releaseCountry
        },
        runtime: this._card.filmInfo.runtime,
        genre: this._card.filmInfo.genre,
        description: this._card.filmInfo.description
      },
      [`user_details`]: {
        watchlist: this._card.userDetails.watchlist,
        [`already_watched`]: this._card.userDetails.alreadyWatched,
        [`watching_date`]: this._card.userDetails.watchingDate,
        favorite: this._card.userDetails.favorite
      }
    };
  }
}
