import {gameMagicConstants} from "../modules/magic-constants";
import {INITIAL_STATE} from "./game-state";

export const countScorePlayer = (answers) => {
  const newGame = {
    answers: {
      slow: answers.filter((answer) => answer.currentAnswer && answer.time >= gameMagicConstants.FAST_ANSWER).length,
      fast: answers.filter((answer) => answer.currentAnswer && answer.time < gameMagicConstants.FAST_ANSWER).length,
    },
    mistakes: answers.filter((answer) => answer.currentAnswer === false).length,
  };
  let totalTime = 0;
  answers.forEach((answer) => {
    totalTime += answer.time;
  });
  if (newGame.mistakes > 3 || totalTime > 300) {
    return -1;
  }
  newGame.scores = newGame.answers.slow + newGame.answers.fast * 2 - newGame.mistakes * 2;
  return newGame.scores;
};

export const showingPlayerResult = (statistics, results) => {
  if (!Array.isArray(statistics)) {
    throw new Error(`PlayersStatistics should be of type Array`);
  }
  const newGame = {
    notes: results.notes,
    time: results.time,
    scores: results.scores
  };
  if (newGame.time === 0) {
    return `Время вышло! Вы не успели отгадать все мелодии`;
  }
  if (newGame.notes === 0) {
    return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  }
  const newStatistics = statistics.concat(newGame.scores);
  newStatistics.sort((left, right) => {
    return right - left;
  });
  const playerPositionStatistics = newStatistics.indexOf(newGame.scores) + 1;
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
