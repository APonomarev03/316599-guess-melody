import AbstractView from './abstract-view';

export default class NotFoundView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
      <section class="modal">
        <h2 class="modal__title">Произошла ошибка!</h2>
        <p class="modal__text">Статус: 404. Пожалуйста, перезагрузите страницу.</p>
      </section>`;
  }
  render() {
    const element = document.createElement(`span`);
    element.innerHTML = this.template;
    return element;
  }

  bind() {}

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = this.render();
    this.bind();
    return this._element;
  }
}
