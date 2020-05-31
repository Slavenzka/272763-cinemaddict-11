import FilmDetails from '../components/film-details';
import {remove} from '../utils/render';
import FilmAdapter from '../adapters/filmAdapter';
import filmsModel from '../models/films';
import commentsModel from '../models/comments';
import apiWithProvider from '../api/provider';

class ModalController {
  constructor() {
    this._card = null;
    this.id = null;
    this._detailsComponent = null;
    this._commentsList = null;

    this._onDataChange = null;
    this._onCommentChange = [];

    this._controlButtonClickHandler = null;

    this.handleClickControl = this.handleClickControl.bind(this);
    this.deleteCommentHandler = this.deleteCommentHandler.bind(this);
    this.addCommentHandler = this.addCommentHandler.bind(this);
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
    this._getUpdatedCommentsList()
      .then((commentsList) => {
        this._commentsList = commentsList;
        this._detailsComponent = new FilmDetails(this._card, commentsList, this.handleClickControl, commentsModel);
        document.querySelector(`.main`)
          .appendChild(this._detailsComponent.getElement());

        this._detailsComponent.setSubmitHandler();
        this._detailsComponent.setCloseOnClickHandler(this.closeModal);
        this._detailsComponent.setCloseOnEscPressHandler(this.closeModal);
        commentsModel.setDeleteCommentHandler(this.deleteCommentHandler);
        commentsModel.setAddCommentHandler(this.addCommentHandler);
      });
  }

  _updateModal(comments) {
    this._card = filmsModel.getFilmsAll().find((film) => film.id === this.id);
    this._detailsComponent.updateData(this._card, comments);
  }

  handleClickControl(type) {
    this._controlButtonClickHandler(type, () => this._updateModal(this._commentsList));
  }

  closeModal() {
    this.id = null;
    this._card = null;
    remove(this._detailsComponent);
  }

  updateHandlers(controlButtonClickHandler, onDataChange) {
    this._controlButtonClickHandler = controlButtonClickHandler;
    this._onDataChange = onDataChange;
  }

  _getUpdatedCommentsList() {
    return apiWithProvider.getComment(this._card.id);
  }

  deleteCommentHandler(commentID, errorCallback) {
    apiWithProvider.deleteComment(commentID)
      .then(() => {
        return this._getUpdatedCommentsList();
      })
      .then((newComments) => {
        this._commentsList = newComments;
        const formattedNewComments = newComments.map((comment) => comment.id);
        this._onDataChange(this._card, Object.assign({}, this._card, {
          comments: formattedNewComments
        }));

        this._updateModal(newComments);
        this.callCommentChangeHandlers();
      })
      .catch((error) => {
        if (errorCallback) {
          errorCallback();
        }
        throw new Error(error);
      });
  }

  addCommentHandler(newComment) {
    this._detailsComponent.disableForm();
    apiWithProvider.addComment(this._card.id, newComment)
      .then((response) => {
        const formattedMovie = FilmAdapter.parseFilm(response[`movie`]);

        this._onDataChange(this._card, Object.assign({}, formattedMovie));

        this._detailsComponent.resetCommentData();
        this._updateModal(response.comments);
        this.callCommentChangeHandlers();
      })
      .catch((error) => {
        this._detailsComponent.enableForm();
        throw new Error(error);
      });
  }

  setCommentChangeHandler(handler) {
    this._onCommentChange.push(handler);
  }

  callCommentChangeHandlers() {
    this._onCommentChange.forEach((handler) => handler());
  }
}

const modalController = new ModalController();
export default modalController;
