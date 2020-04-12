import {createSectionElement} from '../components/section-element';
import {renderSectionHeading} from '../components/section-heading';
import {EXTRA_CATEGORIES} from '../const';
import {renderFilmCards} from '../components/film-cards-list';
import {CARDS_EXTRA_LIST_QTY} from '../const';

const renderExtraCategory = (container, categoryName = ``, cardsList) => {
  const filmsCategory = createSectionElement(container, `films-list--extra`);
  renderSectionHeading(filmsCategory, categoryName);
  const filmsCategoryList = createSectionElement(filmsCategory, `films-list__container`, `div`);

  renderFilmCards(filmsCategoryList, cardsList);
};

export const renderExtraCategories = (container, totalCardsList) => {
  EXTRA_CATEGORIES.forEach((category) => {
    switch (category) {
      case `Top rated`:
        const topRatedFilms = [...totalCardsList]
          .sort((a, b) => a.rating < b.rating)
          .slice(0, CARDS_EXTRA_LIST_QTY);
        renderExtraCategory(container, category, topRatedFilms);
        break;
      case `Most commented`:
        const topCommentedFilms = [...totalCardsList]
          .sort((a, b) => a.userComments.length < b.userComments.length)
          .slice(0, CARDS_EXTRA_LIST_QTY);
        renderExtraCategory(container, category, topCommentedFilms);
        break;
      default:
        return null;
    }
    return null;
  });
};
