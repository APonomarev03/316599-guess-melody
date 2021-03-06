import {INITIAL_STATE} from "../game-data";
import {countScorePlayer} from "../utils/statistics";

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

  _replaceCurrentTime() {
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

  _addCorrectAnswer() {
    this._state.answers = [...this._state.answers, {currentAnswer: true, time: currentTime - this._state.time}];
    this._replaceCurrentTime();
  }

  _addInvalidAnswer() {
    this._state.answers = [...this._state.answers, {currentAnswer: false, time: -1}];
    this._replaceCurrentTime();
  }

  _reduceLives() {
    this._state.notes -= 1;
  }

  manageResults(playerAnswer, questionAnswer) {
    if (JSON.stringify(playerAnswer) !== JSON.stringify(questionAnswer)) {
      this._addInvalidAnswer();
      this._reduceLives();
    } else {
      this._addCorrectAnswer();
    }
  }

  updateStatistics() {
    this._state.scores = countScorePlayer(this._state.answers);
    this._state = Object.assign({}, this._state, {
      time: INITIAL_STATE.time - this._state.time
    });
  }
}
