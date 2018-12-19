import AbstractView from './abstract-view';

export default class ErrorView extends AbstractView {
  constructor(error) {
    super();
    this.error = error;
  }

  get template() {
    return `
      <section class="modal">
        <h2 class="modal__title">Произошла ошибка! ${this.error.message}</h2>
        <p class="modal__text">Попробуйте перезагрузить страницу</p>
      </section>`;
  }

  bind() {}
}
