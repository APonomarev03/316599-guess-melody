import {changeScreen} from "../util";
import {INITIAL_STATE, QUESTIONS} from "../data/game";
import gameArtistScreen from "../screens/game-artist";

export const headerTemplate = (state) => {
  const template = `
  <header class="game__header">
      <a class="game__back" href="#">
        <span class="visually-hidden">Сыграть ещё раз</span>
        <img class="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию">
      </a>

      <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle class="timer__line" cx="390" cy="390" r="370" style="filter: url(#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center" />
      </svg>

      <div class="timer__value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer__mins">${state.time.minutes}</span>
        <span class="timer__dots">:</span>
        <span class="timer__secs">${state.time.seconds}</span>
      </div>

      <div class="game__mistakes">${new Array(state.notes).fill(`<div class="wrong"></div>`)}</div>
   </header>\`;
`;
  const element = document.createElement(`template`);
  element.innerHTML = template;

  const gameBack = element.content.querySelector(`.game__back`);
  gameBack.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    const newGame = Object.assign({}, INITIAL_STATE, {
      level: 1
    });
    changeScreen(gameArtistScreen(newGame, QUESTIONS[`screen-${newGame.level}`]));
  });

  return element.content;
};
