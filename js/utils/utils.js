const main = document.querySelector(`.app`);

export const changeView = (element) => {
  main.innerHTML = ``;
  main.appendChild(element);
};


let activeTrackElement;

export const enableFirstTrack = (level) => {
  const tracks = level.element.querySelectorAll(`.track__button`);
  const firstAudio = tracks[0].parentElement.querySelector(`audio`);
  firstAudio.play();
  tracks[0].classList.remove(`track__button--play`);
  activeTrackElement = firstAudio;
};

const pauseActiveTrack = (audio) => {
  if (audio) {
    audio.pause();
    audio.parentElement.querySelector(`.track__button`).classList.add(`track__button--play`);
  }
};

export const toggleTrack = (track) => {
  console.log(track);
  const trackBtnElement = track;
  const audioElement = trackBtnElement.parentElement.querySelector(`audio`);

  if (trackBtnElement.classList.contains(`track__button--play`)) {
    pauseActiveTrack(activeTrackElement);
    audioElement.play();
    activeTrackElement = audioElement;
    trackBtnElement.classList.remove(`track__button--play`);
  } else {
    activeTrackElement = undefined;
    audioElement.pause();
    trackBtnElement.classList.add(`track__button--play`);
  }
};
