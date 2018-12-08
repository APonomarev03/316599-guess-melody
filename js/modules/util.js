import {gameConstants} from "./magic-constants";

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

export const changeLevel = (state, level) => {
  if (typeof level !== `number`) {
    throw new Error(`level should be of type number`);
  }
  if (level < 0) {
    throw new Error(`level cannot be less than zero`);
  }
  if (level > gameConstants.MAX_GAME_LEVEL) {
    throw new Error(`the level can not be more than ten`);
  }
  return Object.assign({}, state, {level});
};
