import AbstractComponent from './abstract-component';

const createFooterCountTemplate = (totalMoviesQuantity) => {
  return totalMoviesQuantity > 0
    ? (`<p>${totalMoviesQuantity} movies inside</p>`)
    : ``;
};

export default class FooterCount extends AbstractComponent {
  constructor(totalMoviesQuantity) {
    super();
    this._totalQuantity = totalMoviesQuantity;
  }

  getTemplate() {
    return createFooterCountTemplate(this._totalQuantity);
  }
}
