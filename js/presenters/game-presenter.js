import HeaderView from '../views/header-view';
import ArtistView from '../views/artist-view';
import FooterView from '../views/footer-view';
import Application from "../application";
import GenreView from "../views/genre-view";
import {changeView} from "../utils";
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
    this.level = new ArtistView(this.model.currentQuestion);
    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.level.element);
    this.root.appendChild(new FooterView().element);
    this.bind();
    this._timer = null;
  }

  get element() {
    return this.root;
  }

  _tick() {
    if (this.model.failTime) {
      this.stopGame();
      Application.showFailTime();
    } else {
      this.model.tick();
      this.model.incrementAnswerTime();
      this.updateHeader();
      this._timer = setTimeout(() => this._tick(), 1000);
    }
  }

  startGame() {
    this.model.restart();
    setTimeout(() => this._tick(), 1000);
    changeView(this.root);
  }

  continueGame() {
    setTimeout(() => this._tick(), 1000);
    changeView(this.root);
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
      const level = this.model.isArtistQuestion ? new ArtistView(this.model.currentQuestion) : new GenreView(this.model.currentQuestion);
      this.changeContentView(level);
      this.bind();
      this.continueGame();
    }
  }

  stopGame() {
    clearInterval(this._timer);
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
      this.stopGame();
      evt.preventDefault();

      if (this.model.isArtistQuestion) {
        const clickedElement = evt.target;
        const wrapper = clickedElement.closest(`.artist`);
        const inputElement = wrapper.querySelector(`input`);
        const successAnswer = this.model.currentQuestion.answers.find((answer) => answer.isCorrect);
        if (inputElement.value === successAnswer.artist) {
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
        const correctAnswersFiltered = correctAnswers.map((answer) => !!answer.isCorrect);
        const isCorrectAnswer = playersAnswersFiltered.join() === correctAnswersFiltered.join();

        if (!isCorrectAnswer) {
          this.model.addInvalidAnswer();
          this.model.reduceLives();
        } else {
          this.model.addCorrectAnswer();
        }
      }

      if (this.model.winGame) {
        const results = this.model.gameResults;
        Application.showStats(this.model.state, results);
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
