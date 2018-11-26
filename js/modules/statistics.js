import {gameMagicConstants} from "../modules/magic-constants";
import {INITIAL_STATE} from "./game-state";

export const countScorePlayer = (answers) => {
  const slowCount = answers.filter((answer) => answer.currentAnswer && answer.time >= gameMagicConstants.FAST_ANSWER).length;
  const fastCount = answers.filter((answer) => answer.currentAnswer && answer.time < gameMagicConstants.FAST_ANSWER).length;
  const mistakesCount = answers.filter((answer) => answer.currentAnswer === false).length;
  let totalTime = 0;
  answers.forEach((answer) => {
    totalTime += answer.time;
  });
  if (mistakesCount > 3 || totalTime > 300) {
    return -1;
  }
  return slowCount + fastCount * 2 - mistakesCount * 2;
};

export const showingPlayerResult = (statistics, results) => {
  if (!Array.isArray(statistics)) {
    throw new Error(`PlayersStatistics should be of type Array`);
  }
  if (results.time === 0) {
    return `Время вышло! Вы не успели отгадать все мелодии`;
  }
  if (results.notes === 0) {
    return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  }
  const newStatistics = statistics.concat(results.scores);
  newStatistics.sort((left, right) => {
    return right - left;
  });
  const playerPositionStatistics = newStatistics.indexOf(results.scores) + 1;
  const successPercent = (statistics.length - playerPositionStatistics) / statistics.length * 100;
  return `Вы заняли ${playerPositionStatistics} место из ${statistics.length} игроков. Это лучше, чем у ${successPercent}% игроков`;
};

export const playerLivesManagement = (mistakes) => {
  if (typeof mistakes !== `number`) {
    throw new Error(`mistakes should be of type number`);
  }
  const newGameState = Object.assign({}, INITIAL_STATE);
  newGameState.notes -= mistakes;
  return newGameState.notes;
};

export const changeLevel = (level) => {
  if (typeof level !== `number`) {
    throw new Error(`level should be of type number`);
  }
  if (level < 0) {
    throw new Error(`level cannot be less than zero`);
  }
  if (level > gameMagicConstants.MAX_GAME_LEVEL) {
    throw new Error(`the level can not be more than ten`);
  }
  return ++level;
};
