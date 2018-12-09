import {changeScreen, checkQuestionTypeArtist, renderScreen} from '../util';
import {managePlayerLives, showPlayerResult, countScorePlayer, changeLevel} from '../statistics';
import {headerTemplate} from "../templates/header-template";
import {PLAYERS_STATISTICS, QUESTIONS} from "../data/game";
import gameArtistScreen from "./game-artist";
import gameGenreScreen from "./game-genre";
import successResultScreen from "./result-success";
import {footerTemplate} from "../templates/footer-template";

export default (state, game) => {
  const template = `
    <section class="game game--genre">
      <section class="game__screen">
        <h2 class="game__title">${game.text}</h2>
        <form class="game__tracks">
          ${[...game.answers].map((answer, idx) => `<div class="track">
              <button class="track__button track__button--play" type="button"></button>
              <div class="track__status">
                <audio src="${answer.src}"></audio>
              </div>
              <div class="game__answer">
                <input class="game__input visually-hidden" value="${answer.name}" type="checkbox" name="answer" id="answer-${idx + 1}">
                <label for="answer-${idx + 1}" class="game__check">Отметить</label>
              </div>
            </div>`)}
          <button class="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
  </section>`;

  const element = renderScreen(template);
  element.prepend(headerTemplate(state));
  element.appendChild(footerTemplate());
  const form = element.querySelector(`.game__tracks`);
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

    playerAnswers.forEach((answer) => {
      if (answer.value === correctAnswer.name) {
        state.answers.push({currentAnswer: true, time: 30});
      } else {
        state.answers.push({currentAnswer: false, time: 30});
        state.notes = managePlayerLives(state.notes);
      }
    });

    if (state.level === 10 || state.notes < 0) {
      state.scores = countScorePlayer(state.answers);
      const results = showPlayerResult(PLAYERS_STATISTICS, state);
      changeScreen(successResultScreen(state, results));
    }

    if (state.notes > 0 && state.level <= 10) {
      state.level = changeLevel(state.level);
      if (checkQuestionTypeArtist(QUESTIONS[`screen-${state.level}`].type)) {
        changeScreen(gameArtistScreen(state, QUESTIONS[`screen-${state.level}`]));
      } else {
        changeScreen(gameGenreScreen(state, QUESTIONS[`screen-${state.level}`]));
      }
    }
  });

  return element;
};
