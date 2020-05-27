import FilmCardComponent from '../components/film-card';
import {render} from '../utils/render';
import {replace, remove} from '../utils/render';
import {api, modalController} from '../main';
import FilmAdapter from '../adapters/filmAdapter';
import moment from 'moment';

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

    this.component.setWatchlistButtonHandler((evt) => {
      evt.preventDefault();
      this._controlButtonClickHandler(`watchlist`);
    });

    this.component.setWatchedButtonHandler((evt) => {
      evt.preventDefault();
      this._controlButtonClickHandler(`alreadyWatched`);
    });

    this.component.setFavoriteButtonHandler((evt) => {
      evt.preventDefault();
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

  _controlButtonClickHandler(type, callback) {
    const copyUserData = Object.assign({}, this._card.userDetails);
    copyUserData[type] = !this._card.userDetails[type];

    if (type === `alreadyWatched` && copyUserData[type]) {
      copyUserData.watchingDate = moment().format();
    }

    const updatedFilmData = Object.assign({}, this._card, {
      userDetails: copyUserData
    });

    api.updateFilm(this._card.id, this._getServerFormattedData(updatedFilmData))
      .then((response) => {
        const formattedResponse = FilmAdapter.parseFilm(response);

        this._onDataChange(this._card, Object.assign({}, this._card, {
          userDetails: formattedResponse.userDetails
        }));

        callback();
      });
  }

  _getServerFormattedData(data) {
    return {
      id: data.id,
      comments: data.comments,
      [`film_info`]: {
        title: data.filmInfo.title,
        [`alternative_title`]: data.filmInfo.alternativeTitle,
        [`total_rating`]: data.filmInfo.totalRating,
        poster: data.filmInfo.poster,
        [`age_rating`]: data.filmInfo.ageRating,
        director: data.filmInfo.director,
        writers: data.filmInfo.writers,
        actors: data.filmInfo.actors,
        release: {
          date: data.filmInfo.release.date,
          [`release_country`]: data.filmInfo.release.releaseCountry
        },
        runtime: data.filmInfo.runtime,
        genre: data.filmInfo.genre,
        description: data.filmInfo.description
      },
      [`user_details`]: {
        watchlist: data.userDetails.watchlist,
        [`already_watched`]: data.userDetails.alreadyWatched,
        [`watching_date`]: data.userDetails.watchingDate,
        favorite: data.userDetails.favorite
      }
    };
  }
}
