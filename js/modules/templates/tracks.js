export const getTracks = (tracks) => {
  const template = `
  <div class="track">
      <button class="track__button track__button--play" type="button"></button>
        <div class="track__status">
          <audio></audio>
        </div>
        <div class="game__answer">
          <input class="game__input visually-hidden" type="checkbox" name="answer" id="answer-4">
          <label class="game__check">Отметить</label>
        </div>
  </div>`;
  const fragment = document.createDocumentFragment();
  tracks.forEach((track, idx) => {
    const element = document.createElement(`template`);
    element.innerHTML = template;
    element.content.querySelector(`audio`).src = track.src;
    element.content.querySelector(`.game__input`).value = track.name;
    element.content.querySelector(`.game__input`).id = `answer-${idx + 1}`;
    element.content.querySelector(`.game__check`).htmlFor = `answer-${idx + 1}`;
    fragment.appendChild(element.content);
  });
  return fragment;
};
