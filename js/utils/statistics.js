import {Constants} from "./constants";

export const countScorePlayer = (answers) => {
  const isMistake = answers.filter((answer) => answer.currentAnswer === false).length;
  const isSlow = (answer) => answer.currentAnswer && answer.time < Constants.FAST_ANSWER;
  const isFast = (answer) => answer.currentAnswer && answer.time < Constants.FAST_ANSWER;

  const totalTime = answers.reduce((total, answer) => {
    total += answer.time;
    return total;
  }, 0);

  if (isMistake > 3 || totalTime > 300) {
    return -1;
  }

  return answers.reduce((total, answer) => {
    if (isFast(answer)) {
      total += 2;
      return total;
    } else if (isSlow(answer)) {
      total += 1;
      return total;
    }

    total -= 2;
    return total;
  }, 0);
};

export const showPlayerResult = (statistics, results) => {
  if (!Array.isArray(statistics)) {
    throw new Error(`PlayersStatistics should be of type Array`);
  }
  if (results.time === 0) {
    return `Время вышло! Вы не успели отгадать все мелодии`;
  }
  if (results.notes < 0) {
    return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  }
  const newStatistics = statistics.slice(0, 9).concat(results.scores);
  newStatistics.sort((left, right) => {
    return right - left;
  });
  const playerPositionStatistics = newStatistics.indexOf(results.scores) + 1;
  const successPercent = (statistics.length - playerPositionStatistics) / statistics.length * 100;
  return `Вы заняли ${playerPositionStatistics} место из ${statistics.length} игроков. Это лучше, чем у ${Math.round(successPercent)}% игроков`;
};

export const manageNewStatistics = (oldStatistics, scores) => {
  const newStatistics = oldStatistics.slice(0, 9).concat(scores);
  newStatistics.sort((left, right) => {
    return right - left;
  });
  return newStatistics;
};

export const managePlayerLives = (notes) => {
  if (typeof notes !== `number`) {
    throw new Error(`mistakes should be of type number`);
  }
  return notes - 1;
};

export const changeLevel = (level) => {
  if (typeof level !== `number`) {
    throw new Error(`level should be of type number`);
  }
  if (level < 0) {
    throw new Error(`level cannot be less than zero`);
  }
  if (level > Constants.MAX_GAME_LEVEL) {
    throw new Error(`the level can not be more than ten`);
  }
  return level + 1;
};
