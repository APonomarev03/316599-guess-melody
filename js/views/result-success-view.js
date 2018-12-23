import AbstractView from './abstract-view';

export default class ResultSuccessView extends AbstractView {
  constructor(state, results) {
    super();
    this._state = state;
    this._results = results;
  }

  get template() {
    return `
      <section class="main">
        <section class="result">
          <div class="result__logo"><img src="/img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
          <h2 class="result__title">Вы настоящий меломан!</h2>
          <p class="result__total">За ${Math.floor(this._state.time / 60)} минуты и ${this._state.time % 60} секунд вы набрали ${this._state.scores} баллов, совершив ${3 - this._state.notes} ошибки</p>
          <p class="result__text">${this._results}</p>
          <button class="result__replay" type="button">Cыграть еще раз!</button>
        </section>
      </section>`;
  }

  bind() {
    const resultReplayElement = this.element.querySelector(`.result__replay`);
    resultReplayElement.addEventListener(`click`, () => this.onReplay());
  }

  onReplay() {}
}
