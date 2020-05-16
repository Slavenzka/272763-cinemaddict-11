import AbstractComponent from './abstract-component';

const createFilmsPageTemplate = () => (
  `<section class="films"></section>`
);

export default class FilmsPage extends AbstractComponent {
  getTemplate() {
    return createFilmsPageTemplate();
  }
}
