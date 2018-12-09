import {renderScreen, changeScreen, checkQuestionTypeArtist} from "../util";
import gameGenreScreen from "./game-genre";
import gameArtistScreen from "./game-artist";
import {QUESTIONS, INITIAL_STATE} from "../data/game";
import {footerTemplate} from "../templates/footer-template";

export default (state) => {
  const template = `
  <section class="welcome">
    <div class="welcome__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
    <button class="welcome__button"><span class="visually-hidden">Начать игру</span></button>
    <h2 class="welcome__rules-title">Правила игры</h2>
    <p class="welcome__text">Правила просты:</p>
    <ul class="welcome__rules-list">
      <li>За 5 минут нужно ответить на все вопросы.</li>
      <li>Можно допустить 3 ошибки.</li>
    </ul>
    <p class="welcome__text">Удачи!</p>
  </section>`;
  const element = renderScreen(template);
  element.appendChild(footerTemplate());
  const welcomeButton = element.querySelector(`.welcome__button`);

  welcomeButton.addEventListener(`click`, () => {
    const game = Object.assign({}, INITIAL_STATE, {level: 1});
    if (checkQuestionTypeArtist(QUESTIONS[`screen-${game.level}`].type)) {
      changeScreen(gameArtistScreen(game, QUESTIONS[`screen-${game.level}`]));
    } else {
      changeScreen(gameGenreScreen(game, QUESTIONS[`screen-${game.level}`]));
    }
  });
  return element;
};
