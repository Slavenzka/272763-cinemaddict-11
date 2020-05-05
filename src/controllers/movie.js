import FilmCardComponent from '../components/film-card';
import {render} from '../utils/render';
import FilmDetails from '../components/film-details';
import {replace, remove} from '../utils/render';
import {Mode} from '../const';
import {commentsModel} from '../main';

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this.component = null;
    this._detailsComponent = null;
    this._card = null;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;

    this._closeModal = this._closeModal.bind(this);
    this._controlButtonClickHandler = this._controlButtonClickHandler.bind(this);
    // this._deleteCommentHandler = this._deleteCommentHandler.bind(this);
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
      this._controlButtonClickHandler(`watched`);
    });

    this.component.setFavoriteButtonHandler(() => {
      this._controlButtonClickHandler(`favorite`);
    });
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closeModal();
    }
  }

  destroy() {
    remove(this.component);
  }

  updateModal() {
    if (this._detailsComponent) {
      this._detailsComponent.updateData(this._card);
    }
  }

  _renderModal(card) {
    this._onViewChange();
    this._mode = Mode.DETAILED;

    const allComments = commentsModel.getComments();
    const comments = card.comments.map((commentID) => allComments.find((comment) => comment.id === commentID));

    this._detailsComponent = new FilmDetails(card, comments, (evt) => {
      this._controlButtonClickHandler(evt.target.getAttribute(`for`));
    }/* this._deleteCommentHandler*/);
    document.querySelector(`.main`)
      .appendChild(this._detailsComponent.getElement());

    this._detailsComponent.setSubmitHandler();
    this._detailsComponent.setCloseOnClickHandler(this._closeModal);
    this._detailsComponent.setCloseOnEscPressHandler(this._closeModal);
  }

  _controlButtonClickHandler(type) {
    let controlName = ``;

    switch (type) {
      case `watchlist`:
        controlName = `isInWatchlist`;
        break;
      case `watched`:
        controlName = `isWatched`;
        break;
      case `favorite`:
        controlName = `isFavorite`;
        break;
    }

    this._onDataChange(this._card, Object.assign({}, this._card, {
      [controlName]: !this._card[controlName]
    }));
  }

  _closeModal() {
    this._mode = Mode.DEFAULT;
    this._detailsComponent._element.remove();
    this._detailsComponent.removeElement();
  }
}
