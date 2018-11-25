export const INITIAL_STATE = Object.freeze({
  level: {
    defaultLevel: 0,
    currentLevel: 0,
    maxLevel: 10
  },
  notes: 3,
  scores: 0,
  answers: {
    slow: 0,
    fast: 0,
  },
  time: 300,
  mistakes: 0
});

export const countScorePlayer = (game, answers) => {
  const newGameState = Object.assign({}, game, {
    answers: {
      slow: answers.filter((answer) => answer.currentAnswer && answer.time >= 30).length,
      fast: answers.filter((answer) => answer.currentAnswer && answer.time < 30).length,
    },
    mistakes: answers.filter((answer) => answer.currentAnswer === false).length,
  });
  newGameState.scores = newGameState.answers.slow + newGameState.answers.fast * 2 - newGameState.mistakes * 2;
  if (newGameState.answers.fast + newGameState.answers.slow < 10) {
    return -1;
  } else if (newGameState.mistakes === 0 && newGameState.answers.fast === 0) {
    return 10;
  }
  return newGameState;
};

export const showingPlayerResult = (statistics, results) => {
  if (!Array.isArray(statistics)) {
    throw new Error(`PlayersStatistics should be of type Array`);
  }
  const newGameState = Object.assign({}, INITIAL_STATE, {
    notes: results.notes,
    time: results.time,
    scores: results.scores
  });
  const newStatistics = statistics.concat(newGameState.scores);
  newStatistics.sort((left, right) => {
    return right - left;
  });
  const playerPositionStatistics = newStatistics.indexOf(newGameState.scores) + 1;
  const successPercent = (statistics.length - playerPositionStatistics) / statistics.length * 100;
  if (newGameState.scores === 10) {
    return `Вы заняли ${playerPositionStatistics} место из ${statistics.length} игроков. Это лучше, чем у ${successPercent}% игроков`;
  } else if (newGameState.time === 0) {
    return `Время вышло! Вы не успели отгадать все мелодии`;
  } else if (newGameState.notes === 0) {
    return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  }
  return newStatistics;
};

export const playerLivesManagement = (mistakes) => {
  if (typeof mistakes !== `number`) {
    throw new Error(`mistakes should be of type number`);
  }
  const newGameState = Object.assign({}, INITIAL_STATE);
  newGameState.notes -= mistakes;
  return newGameState;
};

export const changeLevel = (game, level) => {
  if (typeof level !== `number`) {
    throw new Error(`level should be of type number`);
  }
  const newGameState = Object.assign({}, game, {});
  newGameState.level.currentLevel = level > newGameState.level.maxLevel ? null : level;
  return newGameState;
};

export const gameTimerTick = (game, time) => {
  const newGameState = Object.assign({}, game, {});
  if (!game.time) {
    return game;
  }
  newGameState.time -= time;
  return newGameState;
};

export const onTickTimerCallback = (time) => {
  return time + 1;
};

export const onEndTimerCallback = (time) => {
  return time - 1;
};

export const createTimer = (delay, onTickCallback, onEndCallback) => {
  let time = delay;
  return {
    tick() {
      if (time > 0) {
        time--;
        if (time) {
          onTickCallback(time);
        } else {
          onEndCallback(time);
        }
      }
    },
    get time() {
      return time;
    }
  };
};
