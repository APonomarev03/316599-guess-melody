import {changeLevel, changeScreen, checkQuestionTypeArtist, renderScreen} from '../util';
import {getArtists} from '../templates/artists';
import {headerTemplate} from "../templates/header-template";
import {PLAYER_ANSWERS, PLAYERS_RESULTS, PLAYERS_STATISTICS, QUESTIONS} from "../data/game";
import {countScorePlayer, managePlayerLives, showPlayerResult} from "../statistics";
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
      </div>
      <form class="game__artist"></form>
    </section>
</section>`;

  const element = renderScreen(template);
  element.prepend(headerTemplate(state));
  const artists = getArtists(game.answers);
  const artistsForm = element.querySelector(`.game__artist`);
  artistsForm.appendChild(artists);
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
    let answers = Object.assign([], PLAYER_ANSWERS);

    if (inputElement.value === correctAnswer.artist) {
      answers.push({currentAnswer: true, time: 30});
    } else {
      answers.push({currentAnswer: false, time: 30});
      state = managePlayerLives(state);
    }

    if (state.level === 10 || state.notes === 0) {
      state.scores = countScorePlayer(answers);
      const results = showPlayerResult(PLAYERS_STATISTICS, state);
      changeScreen(successResultScreen(state, results));
    }

    if (state.notes > 0) {
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
