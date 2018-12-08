import {renderScreen, changeScreen} from '../util';
import {INITIAL_STATE, QUESTIONS} from "../data/game";
import gameArtistScreen from "./game-artist";

export default (state, result) => {
  const template = `
  <section class="result">
    <div class="result__logo"><img src="/img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
    <h2 class="result__title">Вы настоящий меломан!</h2>
    <p class="result__total">За ${state.time.minutes} минуты и ${state.time.seconds} секунд вы набрали ${state.scores} баллов, совершив ${INITIAL_STATE.notes - state.notes} ошибки</p>
    <p class="result__text">${result}</p>
    <button class="result__replay" type="button">Cыграть еще раз!</button>
  </section>`;

  const element = renderScreen(template);
  const resultReplay = element.querySelector(`.result__replay`);

  resultReplay.addEventListener(`click`, () => {
    const newGame = Object.assign({}, INITIAL_STATE, {
      level: 1
    });
    changeScreen(gameArtistScreen(newGame, QUESTIONS[`screen-${newGame.level}`]));
  });

  return element;
};
