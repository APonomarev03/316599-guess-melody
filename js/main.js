import {INITIAL_STATE, PLAYERS_STATISTICS, QUESTIONS} from "./modules/data/game";
import HeaderView from "./views/header-view";
import WelcomeView from "./views/welcome-view";
import {changeLevel, countScorePlayer, managePlayerLives, showPlayerResult} from "./modules/statistics";
import FooterView from "./views/footer-view";
import GenreView from "./views/genre-view";
import ResultSuccessView from "./views/result-success-view";
import ArtistView from "./views/artist-view";

let state;
const appElement = document.querySelector(`.app`);

const startGame = () => {
  state = Object.assign({}, INITIAL_STATE);
  let welcomeView = new WelcomeView();
  let headerView = new HeaderView(state);
  const footerView = new FooterView();

  appElement.appendChild(headerView.element);
  appElement.appendChild(welcomeView.element);
  appElement.appendChild(footerView.element);

  welcomeView.onClick = () => {
    state.level = changeLevel(state.level + 1);
    let question = QUESTIONS[`screen-${state.level}`];
    let genreView = new GenreView(question);
    headerView = new HeaderView(state);
    appElement.innerHTML = ``;
    appElement.appendChild(headerView.element);
    appElement.appendChild(genreView.element);
    appElement.appendChild(footerView.element);

    genreView.onButtonClick = (props) => {
      const trackBtn = props.target;
      const audioElement = trackBtn.nextElementSibling.firstElementChild;
      if (trackBtn.classList.contains(`track__button--play`)) {
        audioElement.play();
        trackBtn.classList.remove(`track__button--play`);
      } else {
        audioElement.pause();
        trackBtn.classList.add(`track__button--play`);
      }
    };

    genreView.onAnswersChecked = (answers, btnSubmit) => {
      const answersFiltered = Array.from(answers).filter((answer) => {
        return answer.checked;
      });

      if (answersFiltered.length > 0) {
        btnSubmit.disabled = false;
      } else {
        btnSubmit.disabled = true;
      }
    };

    genreView.onSubmit = (props) => {
      props.preventDefault();
      props.stopPropagation();
      const form = props.target;
      const playerAnswers = Array.from(form.querySelectorAll(`input[type=checkbox]:checked`));
      const correctAnswer = QUESTIONS[`screen-${state.level}`].answers.find((answer) => answer.isCorrect);
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
        let resultsSuccessView = new ResultSuccessView(state, results);
        headerView = new HeaderView(state);
        appElement.innerHTML = ``;
        appElement.appendChild(headerView.element);
        appElement.appendChild(resultsSuccessView.element);
        appElement.appendChild(footerView.render());
      }

      state.level = changeLevel(state.level);
      question = QUESTIONS[`screen-${state.level}`];
      let artistView = new ArtistView(question);
      headerView = new HeaderView(state);
      appElement.innerHTML = ``;
      appElement.appendChild(headerView.element);
      appElement.appendChild(artistView.element);
      appElement.appendChild(footerView.render());

      artistView.onButtonClick = (props) => {
        const trackBtn = props.target;
        const audioElement = trackBtn.nextElementSibling;
        if (trackBtn.classList.contains(`track__button--play`)) {
          audioElement.play();
          trackBtn.classList.remove(`track__button--play`);
        } else {
          audioElement.pause();
          trackBtn.classList.add(`track__button--play`);
        }
      };

      artistView.onAnswer = (data) => {
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

        if (state.level === 10 || state.notes < 0) {
          state.scores = countScorePlayer(state.answers);
          const results = showPlayerResult(PLAYERS_STATISTICS, state);
          headerView = new HeaderView(state);
          appElement.innerHTML = ``;
          appElement.appendChild(headerView.element);
          appElement.appendChild(new ResultSuccessView(state, results).element);
          appElement.appendChild(footerView.render());
        }

        if (state.notes >= 0) {
          state.level = changeLevel(state.level);
          question = QUESTIONS[`screen-${state.level}`];
          headerView = new HeaderView(state);
          genreView = new GenreView(question);
          appElement.innerHTML = ``;
          appElement.appendChild(headerView.element);
          appElement.appendChild(genreView.element);
          appElement.appendChild(footerView.render());
        }
      };
    };
  };

  headerView.onClick = (props) => {};
};

startGame();

export default startGame;
