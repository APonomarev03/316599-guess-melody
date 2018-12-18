import WelcomePresenter from "./presenters/welcome-presenter";
import GameModel from "./game-model";
import ResultPresenter from "./presenters/result-presenter";
import FailTimePresenter from "./presenters/fail-time-presenter";
import FailTriesPresenter from "./presenters/fail-tries-presenter";
import GamePresenter from "./presenters/game-presenter";
import {changeView, checkStatus} from "./utils";
import SplashView from "./views/splash-view";
import ErrorView from "./views/error-view";

let questData;

export default class Application {

  static startGame() {
    const splash = new SplashView();
    changeView(splash.element);
    splash.start();
    window.fetch(`https://es.dump.academy/guess-melody/questions`).
      then(checkStatus).
      then((response) => response.json()).
      then((data) => {
        questData = data;
      }).
      then(() => Application.showWelcome()).
      catch(Application.showError).
      then(() => splash.stop());
  }

  static showWelcome() {
    const welcome = new WelcomePresenter();
    changeView(welcome.element);
  }

  static showGame() {
    const gameScreen = new GamePresenter(new GameModel(questData));
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

  static showError(error) {
    const errorScreen = new ErrorView(error);
    changeView(errorScreen.element);
  }
}
