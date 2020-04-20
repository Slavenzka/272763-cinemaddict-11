import {RENDER_POSITION} from '../const';

export const renderSectionElement = (container, className, type = `section`) => {
  const sectionElement = document.createElement(type);
  sectionElement.classList.add(className);
  container.appendChild(sectionElement);

  return container.querySelector(`.${className}:last-of-type`);
};

export const renderSectionHeading = (container, text = ``, hidden = false) => {
  const sectionHeading = document.createElement(`h2`);
  sectionHeading.classList.add(`films-list__title`);
  if (hidden) {
    sectionHeading.classList.add(`visually-hidden`);
  }
  sectionHeading.textContent = text;
  container.appendChild(sectionHeading);
};

export const getNodeFromTemplate = (template) => {
  const node = document.createElement(`div`);
  node.innerHTML = template;

  return node.firstChild;
};

export const renderElement = (container, element, position = RENDER_POSITION.BEFOREEND) => {
  switch (position) {
    case `afterbegin`:
      container.prepend(element);
      break;
    default:
      container.append(element);
      break;
  }
};
