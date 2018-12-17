import WelcomePresenter from "./presenters/welcome-presenter";
import GameModel from "./game-model";
import ResultPresenter from "./presenters/result-presenter";
import FailTimePresenter from "./presenters/fail-time-presenter";
import FailTriesPresenter from "./presenters/fail-tries-presenter";
import GamePresenter from "./presenters/game-presenter";

const main = document.querySelector(`.app`);

const changeView = (element) => {
  main.innerHTML = ``;
  main.appendChild(element);
};

export default class Application {
  static showWelcome() {
    const welcome = new WelcomePresenter();
    changeView(welcome.element);
  }

  static showGame() {
    const gameScreen = new GamePresenter(new GameModel());
    gameScreen.startGame();
  }

  static showFailTries() {
    changeView(new FailTriesPresenter().element);
  }

  static showFailTime() {
    changeView(new FailTimePresenter().element);
  }

  static showStats(state, results) {
    const statistics = new ResultPresenter(state, results);
    changeView(statistics.element);
  }
}
