import AbstractView from './abstract-view';
import {Constants} from '../utils/constants';

export default class GenreView extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  get template() {
    return `
      <section class="main">
        <section class="game game--genre">
          <section class="game__screen">
            <h2 class="game__title">${this._data.question}</h2>
            <form class="game__tracks">
              ${this._data.answers.map((answer, idx) => `<div class="track">
                  <div class="track__status">
                    <button class="track__button track__button--play" type="button"></button>
                    <audio src="${answer.src}"></audio>
                  </div>
                  <div ${Constants.DEBUG && answer.genre === this._data.genre ? Constants.DEBUG_STYLE : ``} class="game__answer">
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

  bind() {
    const formElement = this.element.querySelector(`.game__tracks`);
    const trackElements = this.element.querySelectorAll(`.track__button`);
    const gameSubmitElement = this.element.querySelector(`.game__submit`);
    const answersElements = this.element.querySelectorAll(`.game__answer input`);

    trackElements.forEach((button) => {
      button.addEventListener(`click`, (evt) => this.onButtonClick(evt.target));
    });

    formElement.addEventListener(`change`, () => {
      const answersFiltered = Array.from(answersElements).filter((answer) => {
        return answer.checked;
      });
      gameSubmitElement.disabled = answersFiltered.length <= 0;
    });
    formElement.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      const wrapperElement = evt.target;
      const answersCheckedElements = Array.from(wrapperElement.querySelectorAll(`input[type=checkbox]`));
      return this.onAnswer(answersCheckedElements);
    });
  }

  onButtonClick() {}
  onAnswer() {}
}
