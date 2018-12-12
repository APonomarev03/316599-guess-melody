import AbstractView from './abstract-view';

export default class ArtistView extends AbstractView {
  constructor(question) {
    super();
    this.question = question;
  }

  get template() {
    return `
      <section class="main">
        <section class="game game--artist">
          <section class="game__screen">
            <h2 class="game__title">${this.question.text}</h2>
            <div class="game__track">
              <button class="track__button track__button--play" type="button"></button>
              <audio src="${this.question.answers[0].src}"></audio>
            <form class="game__artist">
              ${this.question.answers.map((answer) => `<div class="artist">
                  <input class="artist__input visually-hidden" value="${answer.artist}" type="radio" name="answer">
                  <label class="artist__block" for="answer-1">
                    <img class="artist__picture" src="${answer.image}" alt="${answer.artist}">
                    <span class="artist__name">${answer.artist}</span>
                  </label>
              </div>`)}
            </form>
          </section>
        </section>
      </section>`;
  }
  render() {
    const element = document.createElement(`template`);
    element.innerHTML = this.template;
    return element.content;
  }

  onButtonClick() {}
  onAnswer() {}

  bind() {
    const answerWrapper = this.element.querySelector(`.game__artist`);
    const trackButtons = this.element.querySelector(`.track__button`);
    trackButtons.addEventListener(`click`, (evt) => this.onButtonClick(evt));
    answerWrapper.addEventListener(`click`, (evt) => this.onAnswer(evt));
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
