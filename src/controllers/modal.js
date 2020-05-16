import FilmDetails from '../components/film-details';
import {commentsModel, filmsModel} from '../main';
import {remove} from '../utils/render';

export default class ModalController {
  constructor() {
    this._card = null;
    this.id = null;
    this._detailsComponent = null;

    this._controlButtonClickHandler = null;
    this._onDataChange = null;

    this.handleClickControl = this.handleClickControl.bind(this);
    this._deleteCommentHandler = this._deleteCommentHandler.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  render(controlButtonClickHandler, onDataChange, cardID) {
    if (this._detailsComponent) {
      this.closeModal();
    }

    this.id = cardID;
    this._controlButtonClickHandler = controlButtonClickHandler;
    this._onDataChange = onDataChange;

    this._card = filmsModel.getFilms().find((film) => film.id === this.id);
    this._detailsComponent = new FilmDetails(this._card, this._getUpdatedCommentsList(), this.handleClickControl, commentsModel.removeComment);
    document.querySelector(`.main`)
      .appendChild(this._detailsComponent.getElement());

    this._detailsComponent.setSubmitHandler();
    this._detailsComponent.setCloseOnClickHandler(this.closeModal);
    this._detailsComponent.setCloseOnEscPressHandler(this.closeModal);
    commentsModel.setDataChangeHandler(this._deleteCommentHandler);
  }

  _updateModal() {
    this._card = filmsModel.getFilms().find((film) => film.id === this.id);
    this._detailsComponent.updateData(this._card, this._getUpdatedCommentsList());
  }

  handleClickControl(type) {
    this._controlButtonClickHandler(type);
    this._updateModal();
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
    }), `comment`);

    this._updateModal();
  }

  closeModal() {
    remove(this._detailsComponent);
  }
}
