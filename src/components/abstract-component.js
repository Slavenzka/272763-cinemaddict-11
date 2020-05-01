import {getNodeFromTemplate} from '../utils/render';

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
    this._element = null;
  }
}
