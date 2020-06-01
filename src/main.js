import BoardController from './controllers/board';
import FilmAdapter from './adapters/filmAdapter';
import FooterCountComponent from './components/footer-count';
import {render} from './utils/render';
import sortComponent from './components/sort';
import userRank from './components/user-rank';
import filmsModel from './models/films';
import filmsScreenWrapper from './components/films-page';
import statsComponent from './components/stats';
import apiWithProvider from './api/provider';
import filterController from './controllers/filter';

const mainElement = document.querySelector(`.main`);
const headerElement = document.querySelector(`.header`);
const footerCounterContainer = document.querySelector(`.footer__statistics`);

render(headerElement, userRank);
render(mainElement, filmsScreenWrapper);
render(mainElement, statsComponent);
statsComponent.hide();

const board = new BoardController(mainElement, filmsModel, sortComponent);

const loadingLabel = document.createElement(`DIV`);
loadingLabel.innerText = `Loading...`;
loadingLabel.style = `margin-top: 35px`;
document.querySelector(`section.films`).appendChild(loadingLabel);

apiWithProvider.getFilms()
  .then((films) => {
    filmsModel.setFilms(FilmAdapter.parseFilms(films));

    loadingLabel.remove();

    userRank.updateUserRank(filmsModel);

    const footerCounter = new FooterCountComponent(films.length);
    render(footerCounterContainer, footerCounter);

    filterController.render();
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
