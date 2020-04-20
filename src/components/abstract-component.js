import {getNodeFromTemplate} from '../utils';

export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Fail on attempt to instantiate abstract component!`);
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error(`Fail on attempt to call abstract method!`);
  }

  getElement() {
    if (!this._element) {
      this._element = getNodeFromTemplate(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    if (this._element) {
      this._element.remove();
      this._element = null;
    }
  }
}