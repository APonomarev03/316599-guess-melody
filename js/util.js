import HeaderView from "./views/header-view";
import FooterView from "./views/footer-view";
import {changeLevel, countScorePlayer, managePlayerLives, showPlayerResult} from "./modules/statistics";
import {INITIAL_STATE, PLAYERS_STATISTICS, QUESTIONS} from "./modules/data/game";
import {gameConstants} from "./modules/magic-constants";
import ResultSuccessView from "./views/result-success-view";
import GenreView from "./views/genre-view";
import WelcomeView from "./views/welcome-view";
import ArtistView from "./views/artist-view";
import FailTriesView from "./views/fail-tries-view";

const appElement = document.querySelector(`.app`);

export const checkQuestionTypeArtist = (questionType) => {
  return questionType === `artist`;
};

export const renderStartGame = () => {
  let state = Object.assign({}, INITIAL_STATE, {level: 1});
  let question = QUESTIONS[`screen-${state.level}`];
  const genreLevel = createGameLevelArtist(question, state);
  appElement.innerHTML = ``;
  updateHeader(state);
  updateLevel(genreLevel);
  updateFooter();
};

export const createGameLevelArtist = (question, state) => {
  const artist = new ArtistView(question);

  artist.onButtonClick = (evt) => {
    toggleAudio(evt);
  };

  artist.onAnswer = (data) => {
    data.preventDefault();
    const clickedElement = data.target;
    const wrapper = clickedElement.closest(`.artist`);
    const inputElement = wrapper.querySelector(`input`);
    const successAnswer = question.answers.find((answer) => answer.isCorrect);

    if (inputElement.value === successAnswer.artist) {
      state.answers.push({currentAnswer: true, time: 30});
    } else {
      state.answers.push({currentAnswer: false, time: 30});
      state.notes = managePlayerLives(state.notes);
    }
    checkResultsGame(state);
  };
  return artist.element;
};

export const createGameLevelGenre = (question, state) => {
  const genre = new GenreView(question);

  genre.onButtonClick = (evt) => {
    toggleAudio(evt);
  };

  genre.onAnswersChecked = (answers) => {
    const btnSubmit = genre.element.querySelector(`.game__submit`);
    const answersFiltered = Array.from(answers).filter((answer) => {
      return answer.checked;
    });

    if (answersFiltered.length > 0) {
      btnSubmit.disabled = false;
    } else {
      btnSubmit.disabled = true;
    }
  };

  genre.onSubmit = (props) => {
    props.preventDefault();
    props.stopPropagation();
    const form = props.target;
    const playerAnswers = Array.from(form.querySelectorAll(`input[type=checkbox]:checked`));
    const correctAnswer = QUESTIONS[`screen-${state.level}`].answers.find((answer) => answer.isCorrect);

    if (playerAnswers.find((answer) => answer.value !== correctAnswer.name)) {
      state.answers.push({currentAnswer: false, time: 30});
      state.notes = managePlayerLives(state.notes);
    } else {
      state.answers.push({currentAnswer: true, time: 30});
    }
    checkResultsGame(state);
  };
  return genre.element;
};

export const createGameLevelWelcome = () => {
  const welcome = new WelcomeView();
  welcome.onClick = () => {
    renderStartGame();
  };
  return welcome.element;
};

export const updateHeader = (state) => {
  let headerView = new HeaderView(state);
  appElement.appendChild(headerView.element);
  headerView.onClick = () => {
    renderStartGame();
  };
};

export const updateLevel = (level) => {
  appElement.appendChild(level);
};

export const updateFooter = () => {
  const footerView = new FooterView();
  appElement.appendChild(footerView.element);
};

export const toggleAudio = (evt) => {
  const trackBtn = evt.target;
  const audioElement = trackBtn.parentElement.querySelector(`audio`);

  if (trackBtn.parentElement.classList.contains(`track__status`)) {
    const tracks = document.querySelectorAll(`.track__status`);
    tracks.forEach((track) => {
      const currentTrackBtn = track.querySelector(`.track__button`);
      const currentAudio = track.querySelector(`audio`);
      if (track.querySelector(`.track__button`) !== trackBtn) {
        currentAudio.pause();
        currentTrackBtn.classList.add(`track__button--play`);
      }
    });
  }

  if (trackBtn.classList.contains(`track__button--play`)) {
    audioElement.play();
    trackBtn.classList.remove(`track__button--play`);
  } else {
    audioElement.pause();
    trackBtn.classList.add(`track__button--play`);
  }
};

export const checkResultsGame = (state) => {

  if (state.level === gameConstants.MAX_GAME_LEVEL) {
    const statistics = Object.assign([], PLAYERS_STATISTICS);
    state.scores = countScorePlayer(state.answers);
    const results = showPlayerResult(statistics, state);
    const resultSuccessView = new ResultSuccessView(state, results);
    appElement.innerHTML = ``;
    updateLevel(resultSuccessView.element);
    updateFooter();

    resultSuccessView.onReplay = () => {
      renderStartGame();
    };

  } else if (state.notes === gameConstants.GAME_DIE) {
    appElement.innerHTML = ``;
    const failTriesView = new FailTriesView();
    updateLevel(failTriesView.element);
    updateFooter();

    failTriesView.onReplay = () => {
      renderStartGame();
    };
  } else if (state.notes >= 0) {
    state.level = changeLevel(state.level);
    const question = QUESTIONS[`screen-${state.level}`];
    appElement.innerHTML = ``;

    if (checkQuestionTypeArtist(question.type)) {
      const artist = createGameLevelArtist(question, state);
      updateHeader(state);
      appElement.appendChild(artist);
      updateFooter();
    } else {
      const genre = createGameLevelGenre(question, state);
      updateHeader(state);
      appElement.appendChild(genre);
      updateFooter();
    }
  }
};


