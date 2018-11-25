export const gameTimerTick = (game, time) => {
  const newGameState = Object.assign({}, game, {});
  if (!game.time) {
    return game;
  }
  newGameState.time -= time;
  return newGameState;
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
