import {createUserRankTemplate} from './components/user-rank';
import {createSiteNavTemplate} from './components/site-navigation';
import {createItemsSortTemplate} from './components/sort';
import {createFilmCardTemplate} from './components/film-card';
import {createButtonMoreTemplate} from './components/button-more';
import {createFilmDetailsTemplate} from './components/film-details';

const CARDS_MAIN_LIST_QTY = 5;
const EXTRA_CATEGORIES = [`Top rated`, `Most commented`];
const CARDS_EXTRA_LIST_QTY = 2;

const render = (container, content, position = `beforeend`) => {
  container.insertAdjacentHTML(position, content);
};

const renderUserRank = () => {
  const headerElement = document.querySelector(`.header`);
  render(headerElement, createUserRankTemplate());
};

const renderControls = (mainElement) => {
  render(mainElement, createSiteNavTemplate());
  render(mainElement, createItemsSortTemplate());
};

const createSectionElement = (container, className, type = `section`) => {
  const sectionElement = document.createElement(type);
  sectionElement.classList.add(className);
  container.appendChild(sectionElement);

  return container.querySelector(`.${className}:last-of-type`);
};

const renderSectionHeading = (container, text = ``, hidden = false) => {
  const sectionHeading = document.createElement(`h2`);
  sectionHeading.classList.add(`films-list__title`);
  if (hidden) {
    sectionHeading.classList.add(`visually-hidden`);
  }
  sectionHeading.textContent = text;
  container.appendChild(sectionHeading);
};

const renderFilmCards = (container, cardsQuantity) => {
  for (let i = 0; i < cardsQuantity; i++) {
    render(container, createFilmCardTemplate());
  }
};

const renderExtraCategory = (container, heading = ``) => {
  const filmsCategory = createSectionElement(container, `films-list--extra`);
  renderSectionHeading(filmsCategory, heading);
  const filmsCategoryList = createSectionElement(filmsCategory, `films-list__container`, `div`);
  renderFilmCards(filmsCategoryList, CARDS_EXTRA_LIST_QTY);
};

const renderModal = (content) => {
  render(document.body, content);
};

const renderContent = () => {
  const mainElement = document.querySelector(`.main`);

  renderControls(mainElement);

  const filmsSection = createSectionElement(mainElement, `films`);
  const filmsListSection = createSectionElement(filmsSection, `films-list`);
  renderSectionHeading(filmsListSection, `All movies. Upcoming`, true);
  const filmsListContainer = createSectionElement(filmsListSection, `films-list__container`, `div`);
  renderFilmCards(filmsListContainer, CARDS_MAIN_LIST_QTY);
  render(filmsListSection, createButtonMoreTemplate());

  EXTRA_CATEGORIES.forEach((category) => {
    renderExtraCategory(filmsSection, category);
  });
};

renderUserRank();
renderContent();
renderModal(createFilmDetailsTemplate());
