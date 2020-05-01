import AbstractComponent from './abstract-component';

const createButtonMoreTemplate = () => (
  `<button class="films-list__show-more">Show more</button>`
);

export default class ButtonMore extends AbstractComponent {
  getTemplate() {
    return createButtonMoreTemplate();
  }

  addButtonMoreHandler(handler) {
    this._element.addEventListener(`click`, handler);
  }
}
