export const createSectionElement = (container, className, type = `section`) => {
  const sectionElement = document.createElement(type);
  sectionElement.classList.add(className);
  container.appendChild(sectionElement);

  return container.querySelector(`.${className}:last-of-type`);
};
