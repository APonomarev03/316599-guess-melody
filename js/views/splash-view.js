import AbstractView from './abstract-view';

export default class SplashView extends AbstractView {
  constructor() {
    super();
    this._cursor = 0;
    this._symbolsSeq = `/—\\|`;
  }

  get template() {
    return `
      <div class="loader__wrapper">
        <div class="loader__title">Подождите, идет загрузка данных...</div>
        <div class="loader__char"></div>
      </div>`;
  }

  start() {
    this._cursor = ++this._cursor >= this._symbolsSeq.length ? 0 : this._cursor;
    this.element.querySelector(`.loader__char`).textContent = this._symbolsSeq[this._cursor];
    this._timeout = setTimeout(() => this.start(), 100);
  }

  stop() {
    clearTimeout(this._timeout);
  }
}
