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

  static showStats(state) {
    Loader.loadResults().
      then((data) => {
        let serverStatistics = data[data.length - 1].answers;
        state.scores = countScorePlayer(state.answers);
        state = Object.assign({}, state, {
          time: INITIAL_STATE.time - state.time
        });
        state.answers = data[data.length - 1].answers;
        const results = showPlayerResult(serverStatistics, state);
        const filteredStatistics = {
          answers: manageNewStatistics(serverStatistics, state.scores)
        };
        Loader.saveResults(filteredStatistics);
        const statistics = new ResultPresenter(state, results);
        changeView(statistics.element);
      }).
      catch(Application.showError);
  }

  static showError(error) {
    const errorScreen = new ErrorView(error);
    changeView(errorScreen.element);
  }
}
