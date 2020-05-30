import {RenderPosition} from '../const';

export const renderSectionElement = (container, className, type = `section`) => {
  const sectionElement = document.createElement(type);
  sectionElement.classList.add(className);
  container.appendChild(sectionElement);
  return container.querySelector(`.${className}:last-of-type`);
};

export const renderSectionHeading = (container, text = ``, classNames = [`films-list__title`]) => {
  const sectionHeading = document.createElement(`h2`);
  sectionHeading.classList.add(...classNames);
  sectionHeading.textContent = text;
  container.appendChild(sectionHeading);
};

export const getNodeFromTemplate = (template) => {
  const node = document.createElement(`div`);
  node.innerHTML = template;

  return node.firstChild;
};

export const render = (container, component, position = RenderPosition.BEFOREEND, referenceNode) => {
  switch (position) {
    case `afterbegin`:
      container.prepend(component.getElement());
      break;
    case `beforenode`:
      container.insertBefore(component.getElement(), referenceNode);
      break;
    default:
      container.append(component.getElement());
      break;
  }
};

export const replace = (newComponent, oldComponent) => {
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();
  const parentElement = oldElement.parentElement;

  const isExistElements = !!(parent && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};
