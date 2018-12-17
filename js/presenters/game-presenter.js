import HeaderView from '../views/header-view';
import ArtistView from '../views/artist-view';
import FooterView from '../views/footer-view';
import Application from "../application";
import {changeView} from "../util";
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
    if (this.model.state.time <= 0) {
      this.stopGame();
      Application.showFailTime();
    } else {
      this.model.tick();
      this.updateHeader();
      this._timer = setTimeout(() => this._tick(), 1000);
    }
  }

  startGame() {
    this.model.restart();
    this._tick();
    changeView(this.root);
  }

  continueGame() {
    this._tick();
    changeView(this.root);
  }

  updateHeader() {
    const header = new HeaderView(this.model.state);
    this.root.replaceChild(header.element, this.header.element);
    this.header = header;
  }

  changeLevel() {
    this.model.changeLevel();
    this.updateHeader();
    const level = this.model.gameCurrentScreen();
    this.changeContentView(level);
    this.bind();
    this.continueGame();
  }

  stopGame() {
    clearInterval(this._timer);
  }

  changeContentView(view) {
    this.root.replaceChild(view.element, this.level.element);
    this.level = view;
  }

  bind() {
    this.header.onClick = (evt) => {
      evt.preventDefault();
    };

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

    this.level.onAnswersChecked = (answers) => {
      const btnSubmit = this.level.element.querySelector(`.game__submit`);
      const answersFiltered = Array.from(answers).filter((answer) => {
        return answer.checked;
      });
      btnSubmit.disabled = answersFiltered.length <= 0;
    };

    this.level.onSubmit = (evt) => {
      this.stopGame();
      evt.preventDefault();
      evt.stopPropagation();
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

      if (this.model.winGame()) {
        const results = this.model.gameResults;
        Application.showStats(this.model.state, results);
      } else if (this.model.failTries()) {
        Application.showFailTries();
      } else if (this.model.failTime()) {
        Application.showFailTime();
      } else {
        this.changeLevel();
      }
    };

    this.level.onAnswer = (evt) => {
      this.stopGame();
      evt.preventDefault();
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

      if (this.model.winGame()) {
        const results = this.model.gameResults;
        Application.showStats(this.model.state, results);
      } else if (this.model.failTries()) {
        Application.showFailTries();
      } else if (this.model.failTime()) {
        Application.showFailTime();
      } else {
        this.changeLevel();
      }
    };
  }
}
