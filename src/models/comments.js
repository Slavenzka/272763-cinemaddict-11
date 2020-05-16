export default class CommentsModel {
  constructor() {
    this._comments = [];
    this._deleteCommentHandler = null;
    this._addCommentHandler = null;

    this.removeComment = this.removeComment.bind(this);
    this.addComment = this.addComment.bind(this);
  }

  getComments() {
    return this._comments;
  }

  setComments(comments) {
    this._comments = Array.from(comments);
  }

  removeComment(id) {
    const index = this._comments.findIndex((comment) => comment.id === +id);

    if (index === -1) {
      return false;
    }

    this._comments = [].concat(this._comments.slice(0, index), this._comments.slice(index + 1));
    this._deleteCommentHandler();

    return true;
  }

  addComment(comment) {
    // TODO add new comment to film card comments list
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
