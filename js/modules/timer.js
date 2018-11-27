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
