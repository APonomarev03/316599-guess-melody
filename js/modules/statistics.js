import {gameConstants} from "../modules/magic-constants";

export const countScorePlayer = (answers) => {
  const slowCount = answers.filter((answer) => answer.currentAnswer && answer.time >= gameConstants.FAST_ANSWER).length;
  const fastCount = answers.filter((answer) => answer.currentAnswer && answer.time < gameConstants.FAST_ANSWER).length;
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

export const showPlayerResult = (statistics, results) => {
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

export const managePlayerLives = (game) => {
  const notes = game.notes - 1;
  return Object.assign({}, game, {notes});
};
