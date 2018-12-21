import HeaderView from '../views/header-view';
import ArtistView from '../views/artist-view';
import FooterView from '../views/footer-view';
import Application from "../application";
import GenreView from "../views/genre-view";
import {changeView} from "../utils/utils";
import {gameConstants} from '../utils/constants';

let activeTrack;

const pauseActiveTrack = (audio) => {
  if (audio) {
    audio.pause();
    audio.parentElement.querySelector(`.track__button`).classList.add(`track__button--play`);
  }
};

export default class GamePresenter {
  constructor(model) {
    this.model = model;
    this.header = new HeaderView(this.model.state);
    this.header.onClick = (evt) => {
      evt.preventDefault();
      Application.showWelcome();
    };
    this.level = this.currentTypeLevel;
    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.level.element);
    this.root.appendChild(new FooterView().element);
    this.bind();
    this._timer = null;
  }

  get currentTypeLevel() {
    return this.model.isArtistQuestion ? new ArtistView(this.model.currentQuestion) : new GenreView(this.model.currentQuestion);
  }

  get element() {
    return this.root;
  }

  startTimer() {
    if (this.model.failTime) {
      Application.showFailTime();
    } else {
      this._timer = setTimeout(() => {
        this.model.tick();
        this.startTimer();
        this.updateHeader();
      }, gameConstants.ONE_SECOND);
    }
  }

  stopTimer() {
    clearTimeout(this._timer);
  }

  startGame() {
    this.model.restart();
    changeView(this.root);
    this.startTimer();
  }

  continueGame() {
    changeView(this.root);
    this.startTimer();
  }

  updateHeader() {
    const header = new HeaderView(this.model.state);
    header.onClick = (evt) => {
      evt.preventDefault();
      Application.showWelcome();
    };
    this.root.replaceChild(header.element, this.header.element);
    this.header = header;
  }

  changeLevel() {
    if (this.model.failTries) {
      this.model.restart();
      Application.showFailTries();
    } else {
      this.model.changeLevel();
      this.updateHeader();
      const level = this.currentTypeLevel;
      this.changeContentView(level);
      this.bind();
      this.continueGame();
    }
  }

  changeContentView(view) {
    this.root.replaceChild(view.element, this.level.element);
    this.level = view;
  }

  bind() {

    this.level.onButtonClick = (evt) => {
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

    this.level.onAnswer = (evt) => {
      this.stopTimer();
      evt.preventDefault();

      if (this.model.isArtistQuestion) {
        const clickedElement = evt.target;
        const wrapper = clickedElement.closest(`.artist`);
        const inputElement = wrapper.querySelector(`input`);
        const successAnswer = this.model.currentQuestion.answers.find((answer) => answer.isCorrect);
        if (inputElement.value === successAnswer.title) {
          this.model.addCorrectAnswer();
        } else {
          this.model.addInvalidAnswer();
          this.model.reduceLives();
        }
      } else {
        const form = evt.target;
        const playerAnswers = Array.from(form.querySelectorAll(`input[type=checkbox]`));
        const correctAnswers = this.model.currentQuestion.answers.filter((answer) => answer);
        const playersAnswersFiltered = playerAnswers.map((answer) => !!answer.checked);
        const correctAnswersFiltered = correctAnswers.map((answer) => answer.genre === this.model.currentQuestion.genre);
        const isCorrectAnswer = playersAnswersFiltered.join() === correctAnswersFiltered.join();

        if (!isCorrectAnswer) {
          this.model.addInvalidAnswer();
          this.model.reduceLives();
        } else {
          this.model.addCorrectAnswer();
        }
      }

      if (this.model.winGame) {
        this.model.updateStatistics();
        Application.showStats(this.model.state);
      } else if (this.model.failTries) {
        Application.showFailTries();
      } else if (this.model.failTime) {
        Application.showFailTime();
      } else {
        this.changeLevel();
      }
    };
  }
}
