import AbstractView from './abstract-view';

export default class ResultSuccessView extends AbstractView {
  constructor(state, results) {
    super();
    this.state = state;
    this.results = results;
  }

  get template() {
    return `
      <section class="main">
        <section class="result">
          <div class="result__logo"><img src="/img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
          <h2 class="result__title">Вы настоящий меломан!</h2>
          <p class="result__total">За ${this.state.time.minutes} минуты и ${this.state.time.seconds} секунд вы набрали ${this.state.scores} баллов, совершив ${3 - this.state.notes} ошибки</p>
          <p class="result__text">${this.results}</p>
          <button class="result__replay" type="button">Cыграть еще раз!</button>
        </section>
      </section>`;
  }

  render() {
    const element = document.createElement(`template`);
    element.innerHTML = this.template;
    return element.content;
  }

  onReplay() {}

  bind() {
    const resultReplay = this.element.querySelector(`.result__replay`);
    resultReplay.addEventListener(`click`, () => {});
  }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = this.render();
    this.bind();
    return this._element;
  }
}
