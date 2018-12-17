import {PLAYERS_STATISTICS, QUESTIONS} from './data/game';
import {countScorePlayer, showPlayerResult} from "./modules/statistics";
import ArtistView from "./views/artist-view";
import GenreView from "./views/genre-view";

const INITIAL_STATE = Object.freeze({
  level: 1,
  notes: 3,
  scores: 0,
  answers: [],
  time: 300
});

export default class GameModel {
  constructor() {
    this._state = Object.assign({}, INITIAL_STATE);
  }
  get state() {
    return this._state;
  }

  get currentQuestion() {
    return QUESTIONS[`screen-${this._state.level}`];
  }

  changeLevel() {
    this._state.level += 1;
  }

  restart() {
    this._state = Object.assign({}, INITIAL_STATE);
  }

  isArtistQuestion() {
    return QUESTIONS[`screen-${this._state.level}`].type === `artist`;
  }

  tick() {
    this._state = Object.assign({}, this._state, {
      time: this._state.time - 1
    });
  }

  failTries() {
    return this._state.notes < 0;
  }

  failTime() {
    return this._state.time <= 0;
  }

  winGame() {
    return this._state.level === 10;
  }

  addCorrectAnswer() {
    this._state.answers = [...this._state.answers, {currentAnswer: true, time: INITIAL_STATE.time - this._state.time}];
  }

  addInvalidAnswer() {
    this._state.answers = [...this._state.answers, {currentAnswer: false, time: INITIAL_STATE.time - this._state.time}];
  }

  reduceLives() {
    this._state.notes -= 1;
  }

  get gameResults() {
    const statistics = Object.assign([], PLAYERS_STATISTICS);
    this._state.scores = countScorePlayer(this._state.answers);
    return showPlayerResult(statistics, this._state);
  }
  gameCurrentScreen() {
    return this.isArtistQuestion() ? new ArtistView(this.currentQuestion) : new GenreView(this.currentQuestion);
  }
}
