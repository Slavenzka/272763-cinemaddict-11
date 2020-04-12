export const createUserRankTemplate = (watchedMoviesQuantity) => {
  let status = ``;

  if (watchedMoviesQuantity > 1 && watchedMoviesQuantity <= 10) {
    status = `Novice`;
  } else if (watchedMoviesQuantity > 11 && watchedMoviesQuantity <= 20) {
    status = `Fan`;
  } else if (watchedMoviesQuantity > 21) {
    status = `Movie Buff`;
  }
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${status}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};
