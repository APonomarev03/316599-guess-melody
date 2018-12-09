import {changeScreen, checkQuestionTypeArtist, renderScreen} from '../util';
import {headerTemplate} from "../templates/header-template";
import {footerTemplate} from "../templates/footer-template";
import {PLAYERS_STATISTICS, QUESTIONS} from "../data/game";
import {countScorePlayer, managePlayerLives, showPlayerResult, changeLevel} from "../statistics";
import gameArtistScreen from "./game-artist";
import gameGenreScreen from "./game-genre";
import successResultScreen from "./result-success";

export default (state, game) => {
  const template = `
  <section class="game game--artist">
    <section class="game__screen">
      <h2 class="game__title">${game.text}</h2>
      <div class="game__track">
        <button class="track__button track__button--play" type="button"></button>
        <audio src="${game.answers[0].src}"></audio>
      <form class="game__artist">
        ${game.answers.map((answer) => `<div class="artist">
            <input class="artist__input visually-hidden" value="${answer.artist}" type="radio" name="answer">
            <label class="artist__block" for="answer-1">
              <img class="artist__picture" src="${answer.image}" alt="${answer.artist}">
              <span class="artist__name">${answer.artist}</span>
            </label>
        </div>`)}
      </form>
    </section>
</section>`;

  const element = renderScreen(template);
  element.prepend(headerTemplate(state));
  element.appendChild(footerTemplate());
  const answerWrapper = element.querySelector(`.game__artist`);
  const tracksButtons = element.querySelectorAll(`.track__button`);

  const trackButtonsClickHandler = (evt) => {
    const trackBtn = evt.target;
    const audioElement = trackBtn.nextElementSibling;
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

  answerWrapper.addEventListener(`click`, (evt) => {
    const clickedElement = evt.target;
    const wrapper = clickedElement.closest(`.artist`);
    const inputElement = wrapper.querySelector(`input`);
    const correctAnswer = game.answers.find((answer) => answer.isCorrect);

    if (inputElement.value === correctAnswer.artist) {
      state.answers.push({currentAnswer: true, time: 30});
    } else {
      state.answers.push({currentAnswer: false, time: 30});
      state.notes = managePlayerLives(state.notes);
    }

    if (state.level === 10 || state.notes < 0) {
      state.scores = countScorePlayer(state.answers);
      const results = showPlayerResult(PLAYERS_STATISTICS, state);
      changeScreen(successResultScreen(state, results));
    }

    if (state.notes >= 0) {
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
