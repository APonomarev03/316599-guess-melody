import WelcomePresenter from "./presenters/welcome-presenter";
import GameModel from "./models/game-model";
import ResultPresenter from "./presenters/result-presenter";
import FailTimePresenter from "./presenters/fail-time-presenter";
import FailTriesPresenter from "./presenters/fail-tries-presenter";
import GamePresenter from "./presenters/game-presenter";
import {changeView} from "./utils/utils";
import SplashView from "./views/splash-view";
import ErrorView from "./views/error-view";
import Loader from "./loader";
import {showPlayerResult, manageNewStatistics} from "./utils/statistics";

let questions;

export default class Application {

  static startGame() {
    Application.loadGame()
      .catch(Application.showWelcome);
  }

  static async loadGame() {
    const splash = new SplashView();
    changeView(splash.element);
    splash.start();
    try {
      questions = await Loader.loadQuestions();
      Application.showWelcome();
    } finally {
      splash.stop();
    }
  }

  static showWelcome() {
    const welcome = new WelcomePresenter();
    changeView(welcome.element);
  }

  static showGame() {
    const gameScreen = new GamePresenter(new GameModel(questions));
    gameScreen.startGame();
  }

  static showFailTries() {
    changeView(new FailTriesPresenter().element);
  }

  static showFailTime() {
    changeView(new FailTimePresenter().element);
  }

  static async showStats(state) {
    try {
      const loadResults = await Loader.loadResults();
      const serverStatistics = loadResults[loadResults.length - 1].answers;
      const results = showPlayerResult(serverStatistics, state);
      const filteredStatistics = {
        answers: manageNewStatistics(serverStatistics, state.scores)
      };
      await Loader.saveResults(filteredStatistics);
      const statistics = new ResultPresenter(state, results);
      changeView(statistics.element);
    } catch (e) {
      this.showError(e);
    }
  }

  static showError(error) {
    const errorScreen = new ErrorView(error);
    changeView(errorScreen.element);
  }
}
