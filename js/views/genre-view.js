import AbstractView from './abstract-view';
import {gameConstants} from '../constants';

export default class GenreView extends AbstractView {
  constructor(question) {
    super();
    this.question = question;
  }

  get template() {
    return `
      <section class="main">
        <section class="game game--genre">
          <section class="game__screen">
            <h2 class="game__title">${this.question.text}</h2>
            <form class="game__tracks">
              ${this.question.answers.map((answer, idx) => `<div class="track">
                  <div class="track__status">
                    <button class="track__button track__button--play" type="button"></button>
                    <audio src="${answer.src}"></audio>
                  </div>
                  <div ${gameConstants.DEBUG && answer.isCorrect ? gameConstants.DEBUG_STYLE : ``} class="game__answer">
                    <input class="game__input visually-hidden" value="${answer.name}" type="checkbox" name="answer" id="answer-${idx + 1}">
                    <label for="answer-${idx + 1}" class="game__check">Отметить</label>
                  </div>
                </div>`)}
              <button class="game__submit button" type="submit" disabled>Ответить</button>
            </form>
          </section>
        </section>
      </section>`;
  }

  onButtonClick() {}
  onAnswer() {}

  bind() {
    const form = this.element.querySelector(`.game__tracks`);
    const tracksButton = this.element.querySelectorAll(`.track__button`);
    const gameButtonSubmit = this.element.querySelector(`.game__submit`);
    const answers = this.element.querySelectorAll(`.game__answer input`);

    tracksButton.forEach((button) => {
      button.addEventListener(`click`, (evt) => this.onButtonClick(evt));
    });

    form.addEventListener(`change`, () => {
      const answersFiltered = Array.from(answers).filter((answer) => {
        return answer.checked;
      });
      gameButtonSubmit.disabled = answersFiltered.length <= 0;
    });
    form.addEventListener(`submit`, (evt) => this.onAnswer(evt));
  }
}
