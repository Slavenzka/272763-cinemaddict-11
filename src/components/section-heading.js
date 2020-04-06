export const renderSectionHeading = (container, text = ``, hidden = false) => {
  const sectionHeading = document.createElement(`h2`);
  sectionHeading.classList.add(`films-list__title`);
  if (hidden) {
    sectionHeading.classList.add(`visually-hidden`);
  }
  sectionHeading.textContent = text;
  container.appendChild(sectionHeading);
};
