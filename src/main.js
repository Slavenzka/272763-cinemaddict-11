import UserRankClassComponent from './components/user-rank';
import FooterCountComponent from './components/footer-count';
import {render} from './utils/render';
import {BOARD_PRESETS} from './const';
import {generateFilms} from './mock/cards';
import BoardController from './controllers/board';

const {totalCardsQuantity} = BOARD_PRESETS;
const filmsData = generateFilms(totalCardsQuantity);

export const userProfile = {
  watchlist: filmsData.filter((item) => item.isInWatchlist).length,
  history: filmsData.filter((item) => item.isWatched).length,
  favourites: filmsData.filter((item) => item.isFavourite).length
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

const board = new BoardController(mainElement, userProfile);
board.render(filmsData);

