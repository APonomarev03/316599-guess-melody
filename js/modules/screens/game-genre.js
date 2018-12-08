import {changeLevel, changeScreen, checkQuestionTypeArtist, renderScreen} from '../util';
import {managePlayerLives, showPlayerResult, countScorePlayer} from '../statistics';
import {headerTemplate} from "../templates/header-template";
import {getTracks} from '../templates/tracks';
import {PLAYER_ANSWERS, PLAYERS_STATISTICS, QUESTIONS, PLAYERS_RESULTS} from "../data/game";
import gameArtistScreen from "./game-artist";
import gameGenreScreen from "./game-genre";
import successResultScreen from "./result-success";

export default (state, game) => {
  const template = `
    <section class="game game--genre">
      <section class="game__screen">
        <h2 class="game__title">${game.text}</h2>
        <form class="game__tracks">
          <button class="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
  </section>`;

  const element = renderScreen(template);
  element.prepend(headerTemplate(state));
  const form = element.querySelector(`.game__tracks`);
  const tracks = getTracks(game.answers);
  form.insertBefore(tracks, form.children[0]);
  const tracksButtons = element.querySelectorAll(`.track__button`);
  const gameButtonSubmit = element.querySelector(`.game__submit`);
  const answers = element.querySelectorAll(`.game__answer input`);
  gameButtonSubmit.disabled = true;

  const trackButtonsClickHandler = (evt) => {
    const trackBtn = evt.target;
    const audioElement = trackBtn.nextElementSibling.querySelector(`audio`);
    if (trackBtn.classList.contains(`track__button--play`)) {
      audioElement.play();
      trackBtn.classList.remove(`track__button--play`);
    } else {
      audioElement.pause();
      trackBtn.classList.add(`track__button--play`);
    }
  };

  tracksButtons.forEach((btn) => {
    btn.addEventListener(`click`, trackButtonsClickHandler);
  });

  const toggleAnswersChecked = (items) => {
    const answersFiltered = Array.from(items).filter((item) => {
      return item.checked;
    });

    if (answersFiltered.length > 0) {
      gameButtonSubmit.disabled = false;
    } else {
      gameButtonSubmit.disabled = true;
    }
  };

  form.addEventListener(`change`, () => {
    toggleAnswersChecked(answers);
  });

  form.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    const playerAnswers = Array.from(form.querySelectorAll(`input[type=checkbox]:checked`));
    const correctAnswer = game.answers.find((answer) => answer.isCorrect);
    let answers = Object.assign([], PLAYER_ANSWERS);

    playerAnswers.forEach((answer) => {
      if (answer.value === correctAnswer.name) {
        answers.push({currentAnswer: true, time: 30});
      } else {
        answers.push({currentAnswer: false, time: 30});
        state = managePlayerLives(state);
      }
    });

    if (state.level === 10 || state.notes === 0) {
      state.scores = countScorePlayer(answers);
      const results = showPlayerResult(PLAYERS_STATISTICS, state);
      changeScreen(successResultScreen(state, results));
    }

    if (state.notes > 0 && state.level <= 10) {
      const newGame = changeLevel(state, state.level + 1);
      if (checkQuestionTypeArtist(QUESTIONS[`screen-${newGame.level}`].type)) {
        changeScreen(gameArtistScreen(newGame, QUESTIONS[`screen-${newGame.level}`]));
      } else {
        changeScreen(gameGenreScreen(newGame, QUESTIONS[`screen-${newGame.level}`]));
      }
    }
  });

  return element;
};
