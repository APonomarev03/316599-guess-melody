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
import {INITIAL_STATE} from "./game-data";
import {countScorePlayer, showPlayerResult, manageNewStatistics} from "./utils/statistics";

let questions;

export default class Application {

  static startGame() {
    const splash = new SplashView();
    changeView(splash.element);
    splash.start();
    Loader.loadQuestions().
      then((data) => {
        questions = data;
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
    const gameScreen = new GamePresenter(new GameModel(questions));
    gameScreen.startGame();
  }

  static showFailTries() {
    changeView(new FailTriesPresenter().element);
  }

  static showFailTime() {
    changeView(new FailTimePresenter().element);
  }

  static showStats(model) {
    Loader.loadResults().
      then((data) => {
        const updateData = model.manageStatistics(data);
        Loader.saveResults(updateData.filteredStatistics);
        const statistics = new ResultPresenter(model.state, updateData.results);
        changeView(statistics.element);
      }).
      catch(Application.showError);
  }

  static showError(error) {
    const errorScreen = new ErrorView(error);
    changeView(errorScreen.element);
  }
}
