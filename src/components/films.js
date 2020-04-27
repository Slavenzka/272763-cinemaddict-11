import AbstractComponent from './abstract-component';

const createFilmsTemplate = () => (
  `<section class="films-list"></section>`
);

export default class FilmsComponent extends AbstractComponent {
  getTemplate() {
    return createFilmsTemplate();
  }
}
