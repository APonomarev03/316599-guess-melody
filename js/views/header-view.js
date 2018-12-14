import AbstractView from './abstract-view';

export default class HeaderView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" style="position: absolute; left: -1200em;">
      <filter id="blur">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5"></feGaussianBlur>
        <feOffset dx="0" dy="0"></feOffset>
        <feMerge>
          <feMergeNode></feMergeNode>
          <feMergeNode in="SourceGraphic"></feMergeNode>
        </feMerge>
      </filter>
    </svg>
      <header class="game__header">
        ${this.state.level > 0 ? `<a class="game__back" href="#">
            <span class="visually-hidden">Сыграть ещё раз</span>
            <img class="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию">
          </a>
    
          <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
            <circle class="timer__line" cx="390" cy="390" r="370" style="filter: url(#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center" />
          </svg>
    
          <div class="timer__value" xmlns="http://www.w3.org/1999/xhtml">
            <span class="timer__mins">${this.state.time.minutes}</span>
          <span class="timer__dots">:</span>
          <span class="timer__secs">${this.state.time.seconds}</span>
        </div>
  
        <div class="game__mistakes">${new Array(this.state.notes).fill(`<div class="wrong"></div>`)}</div>` : ``}
       </header>`;
  }

  onClick() {}

  bind() {
    if (this.state.level > 0) {
      const gameBack = this.element.querySelector(`.game__back`);
      gameBack.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this.onClick(`header btn click`);
      });
    }
  }
}
