import API from './api';
import BoardController from './controllers/board';
import CommentsModel from './models/comments';
import FilmsModel from './models/films';
import FilmsPage from './components/films-page';
import FilterController from './controllers/filter';
import FooterCountComponent from './components/footer-count';
import ModalController from './controllers/modal';
import {render} from './utils/render';
import Stats from './components/stats';
import SortComponent from './components/sort';
import UserRankClassComponent from './components/user-rank';
import {generateRandomString} from './utils/common';
import FilmAdapter from './adapters/filmAdapter';

const ENDPOINT = `https://11.ecmascript.pages.academy/cinemaddict`;
const AUTHORIZATION = `Basic ${generateRandomString(15)}`;

const mainElement = document.querySelector(`.main`);
const headerElement = document.querySelector(`.header`);
const footerCounterContainer = document.querySelector(`.footer__statistics`);

export const filmsModel = new FilmsModel();
export const commentsModel = new CommentsModel();

export const userRank = new UserRankClassComponent();
export const filmsScreenWrapper = new FilmsPage();
export const sortComponent = new SortComponent();
export const statsComponent = new Stats();

export const modalController = new ModalController();
const filterController = new FilterController(mainElement, filmsModel);
const board = new BoardController(mainElement, filmsModel, sortComponent);

render(headerElement, userRank);
render(mainElement, filmsScreenWrapper);
render(mainElement, statsComponent);
statsComponent.hide();

const loadingLabel = document.createElement(`DIV`);
loadingLabel.innerText = `Loading...`;
loadingLabel.style = `margin-top: 35px`;
document.querySelector(`section.films`).appendChild(loadingLabel);


export const api = new API(ENDPOINT, AUTHORIZATION);

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(FilmAdapter.parseFilms(films));

    loadingLabel.remove();

    userRank.updateUserRank();

    const footerCounter = new FooterCountComponent(films.length);
    render(footerCounterContainer, footerCounter);

    board.render();
  })
  .catch(() => {
    filmsModel.setFilms([]);

    loadingLabel.remove();

    const footerCounter = new FooterCountComponent([].length);
    render(footerCounterContainer, footerCounter);

    filterController.render();
    board.render();
  });

  // .then((films) => films.map((film) => api.getComment(film)))
  // .then((comments) => Promise.all(comments))
  // .then((response) => {
  //   const allComments = response.reduce((accumulator, current) => accumulator.concat(current), []);
  //   commentsModel.setComments(allComments);
  // });
