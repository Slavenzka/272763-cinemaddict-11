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
    this._deleteCommentHandler = this._deleteCommentHandler.bind(this);
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

  getCardId() {
    return this._card.id;
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
      this._detailsComponent.updateData(this._card, this._getUpdatedCommentsList());
    }
  }

  _renderModal(card) {
    this._onViewChange();
    this._mode = Mode.DETAILED;

    this._detailsComponent = new FilmDetails(card, this._getUpdatedCommentsList(), this._controlButtonClickHandler, commentsModel.removeComment);
    document.querySelector(`.main`)
      .appendChild(this._detailsComponent.getElement());

    this._detailsComponent.setSubmitHandler();
    this._detailsComponent.setCloseOnClickHandler(this._closeModal);
    this._detailsComponent.setCloseOnEscPressHandler(this._closeModal);
    commentsModel.setDataChangeHandler(this._deleteCommentHandler);
  }

  _controlButtonClickHandler(evt) {
    const type = evt;
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

  _getUpdatedCommentsList() {
    const allComments = commentsModel.getComments();
    return allComments.filter((comment) => {
      return this._card.comments.includes(comment.id);
    });
  }

  _deleteCommentHandler() {
    const newComments = this._getUpdatedCommentsList().map((comment) => comment.id);
    this._onDataChange(this._card, Object.assign({}, this._card, {
      comments: newComments
    }));

    this.updateModal();
  }
}
