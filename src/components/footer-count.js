import {getNodeFromTemplate} from '../utils';

const createFooterCountTemplate = (totalMoviesQuantity) => {
  return totalMoviesQuantity > 0
    ? (`<p>${totalMoviesQuantity} movies inside</p>`)
    : ``;
};

export default class FooterCount {
  constructor(totalMoviesQuantity) {
    this._totalQuantity = totalMoviesQuantity;
    this._element = null;
  }

  getTemplate() {
    return createFooterCountTemplate(this._totalQuantity);
  }

  getElement() {
    if (!this._element) {
      this._element = getNodeFromTemplate(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
