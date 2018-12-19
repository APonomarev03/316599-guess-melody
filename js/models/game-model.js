import {INITIAL_STATE} from "../game-data";

let currentTime = INITIAL_STATE.time;

export default class GameModel {
  constructor(data) {
    this._state = Object.assign({}, INITIAL_STATE, {
      questions: data
    });
  }

  get failTries() {
    return this._state.notes < 0;
  }

  get failTime() {
    return this._state.time <= 0;
  }

  get winGame() {
    return this._state.level === 9;
  }

  get state() {
    return this._state;
  }

  get currentQuestion() {
    return this._state.questions[this._state.level];
  }

  get isArtistQuestion() {
    return this._state.questions[this._state.level].type === `artist`;
  }

  replaceCurrentTime() {
    currentTime = this._state.time;
  }

  changeLevel() {
    this._state.level += 1;
  }

  restart() {
    this._state = Object.assign({}, INITIAL_STATE, {
      questions: this._state.questions
    });
  }

  tick() {
    this._state = Object.assign({}, this._state, {
      time: this._state.time - 1
    });
  }

  addCorrectAnswer() {
    this._state.answers = [...this._state.answers, {currentAnswer: true, time: currentTime - this._state.time}];
    this.replaceCurrentTime();
  }

  addInvalidAnswer() {
    this._state.answers = [...this._state.answers, {currentAnswer: false, time: -1}];
    this.replaceCurrentTime();
  }

  reduceLives() {
    this._state.notes -= 1;
  }
}
