import AbstractComponent from './abstract-component';

const createFilmsPageTemplate = () => (
  `<section class="films"></section>`
);

class FilmsPage extends AbstractComponent {
  getTemplate() {
    return createFilmsPageTemplate();
  }
}

const filmsScreenWrapper = new FilmsPage();
export default filmsScreenWrapper;
