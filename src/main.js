import UserRankClassComponent from './components/user-rank';
import FooterCountComponent from './components/footer-count';
import {render} from './utils/render';
import {BOARD_PRESETS} from './const';
import {generateFilms} from './mock/cards';
import BoardController from './controllers/board';
import FilmsModel from './models/films';
import FilterController from './controllers/filter';
import {generateFilmsComments} from './mock/comments';
import CommentsModel from './models/comments';
import ModalController from './controllers/modal';
import Stats from './components/stats';
import FilmsPage from './components/films-page';
import SortComponent from './components/sort';

const {totalCardsQuantity} = BOARD_PRESETS;

const filmsData = generateFilms(totalCardsQuantity);
export const filmsModel = new FilmsModel();
filmsModel.setFilms(filmsData);

const commentsData = generateFilmsComments();
export const commentsModel = new CommentsModel();
commentsModel.setComments(commentsData);

export const modalController = new ModalController();

const mainElement = document.querySelector(`.main`);

const headerElement = document.querySelector(`.header`);
export const userRank = new UserRankClassComponent();
render(headerElement, userRank);

const footerCounterContainer = document.querySelector(`.footer__statistics`);
const footerCounter = new FooterCountComponent(filmsData.length);
render(footerCounterContainer, footerCounter);

const filterController = new FilterController(mainElement, filmsModel);
filterController.render();

export const filmsScreenWrapper = new FilmsPage();
render(mainElement, filmsScreenWrapper);

export const sortComponent = new SortComponent();

const board = new BoardController(mainElement, filmsModel, sortComponent);
board.render(filmsData);

export const statsComponent = new Stats();
render(mainElement, statsComponent);
statsComponent.hide();
