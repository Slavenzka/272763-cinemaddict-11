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

const {totalCardsQuantity} = BOARD_PRESETS;

const filmsData = generateFilms(totalCardsQuantity);
const filmsModel = new FilmsModel();
filmsModel.setFilms(filmsData);

const commentsData = generateFilmsComments();
export const commentsModel = new CommentsModel();
commentsModel.setComments(commentsData);

export const userProfile = {
  watchlist: filmsData.filter((item) => item.isInWatchlist).length,
  history: filmsData.filter((item) => item.isWatched).length,
  favorites: filmsData.filter((item) => item.isFavorite).length
};

const renderHeader = () => {
  const headerElement = document.querySelector(`.header`);
  const userRank = new UserRankClassComponent(userProfile.history);
  render(headerElement, userRank);
};

const renderFooter = () => {
  const footerCounterContainer = document.querySelector(`.footer__statistics`);
  const footerCounter = new FooterCountComponent(filmsData.length);
  render(footerCounterContainer, footerCounter);
};

const mainElement = document.querySelector(`.main`);

renderHeader();
renderFooter();

const filterController = new FilterController(mainElement, filmsModel);
filterController.render();

const board = new BoardController(mainElement, userProfile, filmsModel);
board.render(filmsData);

