export const renderScreen = (template) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template;
  return wrapper;
};

const appElement = document.querySelector(`.main`);

export const changeScreen = (element) => {
  appElement.innerHTML = ``;
  appElement.appendChild(element);
};
