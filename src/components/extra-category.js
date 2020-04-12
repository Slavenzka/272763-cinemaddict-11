import {createSectionElement} from '../components/section-element';
import {renderSectionHeading} from '../components/section-heading';
import {EXTRA_CATEGORIES} from '../const';
import {renderFilmCards} from '../components/film-cards-list';

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
        const topRatedFilms = totalCardsList
          .sort((a, b) => a.rating < b.rating)
          .slice(0, 2);
        renderExtraCategory(container, category, topRatedFilms);
        break;
      case `Most commented`:
        const topCommentedFilms = totalCardsList
          .sort((a, b) => a.commentCount < b.commentCount)
          .slice(0, 2);
        renderExtraCategory(container, category, topCommentedFilms);
        break;
      default:
        return null;
    }
    return null;
  });
};
