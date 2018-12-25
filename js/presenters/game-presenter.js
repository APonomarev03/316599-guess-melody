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
    this._bind();
    this._timer = null;
  }

  get currentTypeLevel() {
    return this._model.isArtistQuestion ? new ArtistView(this._model.currentQuestion) : new GenreView(this._model.currentQuestion);
  }

  _startTimer() {
    if (this._model.failTime) {
      Application.showFailTime();
    } else {
      this._timer = setTimeout(() => {
        this._model.tick();
        this._startTimer();
        this._updateHeader();
      }, Constants.ONE_SECOND);
    }
  }

  _stopTimer() {
    clearTimeout(this._timer);
  }

  startGame() {
    this._model.restart();
    changeView(this._root);
    this._startTimer();
  }

  _continueGame() {
    changeView(this._root);
    this._startTimer();
  }

  _updateHeader() {
    const header = new HeaderView(this._model.state);
    header.onClick = (evt) => {
      evt.preventDefault();
      Application.showWelcome();
    };
    this._root.replaceChild(header.element, this._header.element);
    this._header = header;
  }

  _changeLevel() {
    if (this._model.failTries) {
      this._model.restart();
      Application.showFailTries();
    } else {
      this._model.changeLevel();
      this._updateHeader();
      const level = this.currentTypeLevel;
      this._changeContentView(level);
      this._bind();
      this._continueGame();
    }
  }

  _changeContentView(view) {
    this._root.replaceChild(view.element, this._level.element);
    this._level = view;
  }

  _bind() {
    enableFirstTrack(this._level);

    this._level.onButtonClick = (track) => {
      toggleTrack(track);
    };

    this._level.onAnswer = (data) => {
      this._stopTimer();

      if (this._model.isArtistQuestion) {
        const successAnswerElement = this._model.currentQuestion.answers.find((answer) => answer.isCorrect);
        this._model.manageResults(data, successAnswerElement.title);
      } else {
        const correctGenre = this._model.currentQuestion.genre;
        const correctAnswersElements = this._model.currentQuestion.answers.map((answer) => answer.genre === correctGenre);
        this._model.manageResults(data, correctAnswersElements);
      }

      if (this._model.winGame) {
        this._model.updateStatistics();
        Application.showStats(this._model.state);
      } else if (this._model.failTries) {
        Application.showFailTries();
      } else if (this._model.failTime) {
        Application.showFailTime();
      } else {
        this._changeLevel();
      }
    };
  }
}
