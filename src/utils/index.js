export const render = (container, content, position = `beforeend`) => {
  container.insertAdjacentHTML(position, content);
};
