export const renderScreen = (template) => {
  const container = document.createElement(`span`);
  container.innerHTML = template;
  return container;
};

export const checkQuestionTypeArtist = (questionType) => {
  return questionType === `artist`;
};

const appElement = document.querySelector(`.main`);

export const changeScreen = (element) => {
  appElement.innerHTML = ``;
  appElement.appendChild(element);
};
