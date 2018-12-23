import AbstractView from './abstract-view';

export default class FailTriesView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
      <section class="main">
        <section class="result">
            <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
            <h2 class="result__title">Какая жалость!</h2>
            <p class="result__total result__total--fail">У вас закончились все попытки. Ничего, повезёт в следующий раз!</p>
            <button class="result__replay" type="button">Попробовать ещё раз</button>
        </section>
      </section>`;
  }

  bind() {
    const resultReplayElement = this.element.querySelector(`.result__replay`);
    resultReplayElement.addEventListener(`click`, (evt) => this.onReplay(evt.target));
  }

  onReplay() {}
}
