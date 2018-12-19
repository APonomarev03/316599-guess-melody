import {PLAYERS_STATISTICS, QUESTIONS} from './data/game';
import {countScorePlayer, showPlayerResult} from "./modules/statistics";

const INITIAL_STATE = Object.freeze({
  level: 1,
  notes: 3,
  scores: 0,
  answers: [],
  time: 300
});

let _currentTime = INITIAL_STATE.time;

export default class GameModel {
  constructor() {
    this._state = Object.assign({}, INITIAL_STATE);
  }

  get failTries() {
    return this._state.notes < 0;
  }

  get failTime() {
    return this._state.time <= 0;
  }

  get winGame() {
    return this._state.level === 10;
  }
  get state() {
    return this._state;
  }

  get currentQuestion() {
    return QUESTIONS[`screen-${this._state.level}`];
  }

  get isArtistQuestion() {
    return QUESTIONS[`screen-${this._state.level}`].type === `artist`;
  }

  get gameResults() {
    const statistics = Object.assign([], PLAYERS_STATISTICS);
    this._state.scores = countScorePlayer(this._state.answers);
    this._state = Object.assign({}, this._state, {
      time: INITIAL_STATE.time - this._state.time
    });
    return showPlayerResult(statistics, this._state);
  }

  replaceCurrentTime() {
    _currentTime = this._state.time;
  }

  changeLevel() {
    this._state.level += 1;
  }

  restart() {
    this._state = Object.assign({}, INITIAL_STATE);
  }

  tick() {
    this._state = Object.assign({}, this._state, {
      time: this._state.time - 1
    });
  }

  addCorrectAnswer() {
    this._state.answers = [...this._state.answers, {currentAnswer: true, time: _currentTime - this._state.time}];
    this.replaceCurrentTime();
  }

  addInvalidAnswer() {
    this._state.answers = [...this._state.answers, {currentAnswer: false, time: _currentTime - this._state.time}];
    this.replaceCurrentTime();
  }

  reduceLives() {
    this._state.notes -= 1;
  }
}
