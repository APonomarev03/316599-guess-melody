import {changeScreen} from "./modules/util";
import welcomeScreen from "./modules/screens/welcome";
import {INITIAL_STATE} from "./modules/data/game";

let state;

const startGame = () => {
  state = Object.assign({}, INITIAL_STATE);
  changeScreen(welcomeScreen(state));
};

startGame();

export default startGame;
