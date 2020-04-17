import {createSectionElement} from '../utils';
import {renderSectionHeading} from '../components/section-heading';
import {renderFilmCards} from '../components/film-cards-list';
import {BOARD_PRESETS} from '../const';

const renderExtraCategory = (container, categoryName = ``, cardsList) => {
  const filmsCategory = createSectionElement(container, `films-list--extra`);
  renderSectionHeading(filmsCategory, categoryName);
  const filmsCategoryList = createSectionElement(filmsCategory, `films-list__container`, `div`);

  renderFilmCards(filmsCategoryList, cardsList);
};

export const renderExtraCategories = (container, totalCardsList) => {
  const getTopRatedFilms = () => {
    const categoryData = [...totalCardsList]
      .sort((a, b) => a.rating < b.rating)
      .slice(0, BOARD_PRESETS.extraListCardsQuantity);
    renderExtraCategory(container, `Top rated`, categoryData);
  };

  const getTopCommentedFilms = () => {
    const categoryData = [...totalCardsList]
      .sort((a, b) => a.userComments.length < b.userComments.length)
      .slice(0, BOARD_PRESETS.extraListCardsQuantity);
    renderExtraCategory(container, `Most commented`, categoryData);
  };

  getTopRatedFilms();
  getTopCommentedFilms();
};
