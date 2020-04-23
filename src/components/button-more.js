import {getNodeFromTemplate} from '../utils/render';
import AbstractComponent from './abstract-component';

const createButtonMoreTemplate = () => (
  `<button class="films-list__show-more">Show more</button>`
);

export default class ButtonMore extends AbstractComponent {
  getTemplate() {
    return createButtonMoreTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = getNodeFromTemplate(this.getTemplate());
      this.handleButtonClick();
    }
    return this._element;
  }

  handleButtonClick(handler) {
    this._element.addEventListener(`click`, handler);
  }
}
