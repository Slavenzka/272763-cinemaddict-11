export default class CommentsModel {
  constructor() {
    this._comments = [];
    this._deleteCommentHandler = null;
    this._addCommentHandler = null;

    this.removeComment = this.removeComment.bind(this);
    this.addComment = this.addComment.bind(this);
  }

  removeComment(id, callbackOnError) {
    this._deleteCommentHandler(id, callbackOnError);
  }

  addComment(comment) {
    this._comments = [].concat(this._comments, comment);
    this._addCommentHandler(comment);
  }

  setDeleteCommentHandler(handler) {
    this._deleteCommentHandler = handler;
  }

  setAddCommentHandler(handler) {
    this._addCommentHandler = handler;
  }
}
