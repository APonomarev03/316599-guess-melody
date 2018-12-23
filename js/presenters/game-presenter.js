import HeaderView from '../views/header-view';
import ArtistView from '../views/artist-view';
import FooterView from '../views/footer-view';
import Application from "../application";
import GenreView from "../views/genre-view";
import {changeView, toggleTrack, enableFirstTrack} from "../utils/utils";
import {Constants} from '../utils/constants';

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
    return this._model.isArtistQuestion ? new ArtistView(this._model.currentQuestion) : new GenreView(this._model.currentQuestion);
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
      }, Constants.ONE_SECOND);
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
    const header = new HeaderView(this._model.state);
    header.onClick = (evt) => {
      evt.preventDefault();
      Application.showWelcome();
    };
    this._root.replaceChild(header.element, this._header.element);
    this._header = header;
  }

  changeLevel() {
    if (this._model.failTries) {
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

    this._level.onButtonClick = (track) => {
      toggleTrack(track);
    };

    this._level.onAnswer = (data) => {
      this.stopTimer();

      if (this._model.isArtistQuestion) {
        const successAnswerElement = this._model.currentQuestion.answers.find((answer) => answer.isCorrect);
        if (data.value === successAnswerElement.title) {
          this._model.addCorrectAnswer();
        } else {
          this._model.addInvalidAnswer();
          this._model.reduceLives();
        }
      } else if (!this._model.isArtistQuestion) {
        const correctAnswersElements = this._model.currentQuestion.answers.filter((answer) => answer);
        const playersAnswersFilteredElements = data.map((answer) => !!answer.checked);
        const correctAnswersFilteredElements = correctAnswersElements.map((answer) => answer.genre === this._model.currentQuestion.genre);
        const isCorrectAnswerElement = playersAnswersFilteredElements.join() === correctAnswersFilteredElements.join();

        if (!isCorrectAnswerElement) {
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
