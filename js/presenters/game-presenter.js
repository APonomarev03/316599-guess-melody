import HeaderView from '../views/header-view';
import ArtistView from '../views/artist-view';
import FooterView from '../views/footer-view';
import Application from "../application";
import GenreView from "../views/genre-view";
import {changeView} from "../utils/utils";
import {Сonstants} from '../utils/constants';

let activeTrack;

const pauseActiveTrack = (audio) => {
  if (audio) {
    audio.pause();
    audio.parentElement.querySelector(`.track__button`).classList.add(`track__button--play`);
  }
};

const enableFirstTrack = (level) => {
  const tracks = level.element.querySelectorAll(`.track__button`);
  const firstAudio = tracks[0].parentElement.querySelector(`audio`);
  firstAudio.play();
  tracks[0].classList.remove(`track__button--play`);
  activeTrack = firstAudio;
};

export default class GamePresenter {
  constructor(model) {
    this._model = model;
    this._header = new HeaderView(this._model.state);
    this._header.onClick = (evt) => {
      evt.preventDefault();
      Application.showWelcome();
    };
    this._level = this.currentTypeLevel;
    this._root = document.createElement(`div`);
    this._root.appendChild(this._header.element);
    this._root.appendChild(this._level.element);
    this._root.appendChild(new FooterView().element);
    this.bind();
    this._timer = null;
  }

  get model() {
    return this._model;
  }

  get currentTypeLevel() {
    return this.model.isArtistQuestion ? new ArtistView(this.model.currentQuestion) : new GenreView(this.model.currentQuestion);
  }

  get element() {
    return this._root;
  }

  startTimer() {
    if (this._model.failTime) {
      Application.showFailTime();
    } else {
      this._timer = setTimeout(() => {
        this._model.tick();
        this.startTimer();
        this.updateHeader();
      }, Сonstants.ONE_SECOND);
    }
  }

  stopTimer() {
    clearTimeout(this._timer);
  }

  startGame() {
    this._model.restart();
    changeView(this._root);
    this.startTimer();
  }

  continueGame() {
    changeView(this._root);
    this.startTimer();
  }

  updateHeader() {
    const header = new HeaderView(this.model.state);
    header.onClick = (evt) => {
      evt.preventDefault();
      Application.showWelcome();
    };
    this._root.replaceChild(header.element, this._header.element);
    this._header = header;
  }

  changeLevel() {
    if (this.model.failTries) {
      this._model.restart();
      Application.showFailTries();
    } else {
      this._model.changeLevel();
      this.updateHeader();
      const level = this.currentTypeLevel;
      this.changeContentView(level);
      this.bind();
      this.continueGame();
    }
  }

  changeContentView(view) {
    this._root.replaceChild(view.element, this._level.element);
    this._level = view;
  }

  bind() {

    enableFirstTrack(this._level);

    this._level.onButtonClick = (evt) => {
      const trackBtn = evt.target;
      const audioElement = trackBtn.parentElement.querySelector(`audio`);

      if (trackBtn.classList.contains(`track__button--play`)) {
        pauseActiveTrack(activeTrack);
        audioElement.play();
        activeTrack = audioElement;
        trackBtn.classList.remove(`track__button--play`);
      } else {
        activeTrack = undefined;
        audioElement.pause();
        trackBtn.classList.add(`track__button--play`);
      }
    };

    this._level.onAnswer = (evt) => {
      this.stopTimer();
      evt.preventDefault();

      if (this.model.isArtistQuestion) {
        const clickedElement = evt.target;
        const wrapper = clickedElement.closest(`.artist`);
        const inputElement = wrapper.querySelector(`input`);
        const successAnswer = this._model.currentQuestion.answers.find((answer) => answer.isCorrect);
        if (inputElement.value === successAnswer.title) {
          this._model.addCorrectAnswer();
        } else {
          this._model.addInvalidAnswer();
          this._model.reduceLives();
        }
      } else {
        const form = evt.target;
        const playerAnswers = Array.from(form.querySelectorAll(`input[type=checkbox]`));
        const correctAnswers = this._model.currentQuestion.answers.filter((answer) => answer);
        const playersAnswersFiltered = playerAnswers.map((answer) => !!answer.checked);
        const correctAnswersFiltered = correctAnswers.map((answer) => answer.genre === this._model.currentQuestion.genre);
        const isCorrectAnswer = playersAnswersFiltered.join() === correctAnswersFiltered.join();

        if (!isCorrectAnswer) {
          this._model.addInvalidAnswer();
          this._model.reduceLives();
        } else {
          this._model.addCorrectAnswer();
        }
      }

      if (this._model.winGame) {
        this.model.updateStatistics();
        Application.showStats(this.model.state);
      } else if (this._model.failTries) {
        Application.showFailTries();
      } else if (this._model.failTime) {
        Application.showFailTime();
      } else {
        this.changeLevel();
      }
    };
  }
}
