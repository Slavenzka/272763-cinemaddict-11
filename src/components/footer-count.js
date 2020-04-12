export const renderFooterCount = (totalMoviesQuantity) => {
  const footerCounterContainer = document.querySelector(`.footer__statistics`);

  const counter = document.createElement(`p`);
  counter.textContent = `${totalMoviesQuantity} movies inside`;
  footerCounterContainer.appendChild(counter);
};
