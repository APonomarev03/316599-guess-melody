import AbstractView from './abstract-view';

export default class SplashView extends AbstractView {
  constructor() {
    super();
    this.cursor = 0;
    this.symbolsSeq = `/—\\|`;
  }

  get template() {
    return `
      <div class="loader__wrapper">
        <div class="loader__title">Подождите, идет загрузка данных...</div>
        <div class="loader__char"></div>
      </div>`;
  }

  start() {
    this.cursor = ++this.cursor >= this.symbolsSeq.length ? 0 : this.cursor;
    this.element.querySelector(`.loader__char`).textContent = this.symbolsSeq[this.cursor];
    this.timeout = setTimeout(() => this.start(), 100);
  }

  stop() {
    clearTimeout(this.timeout);
  }
}
