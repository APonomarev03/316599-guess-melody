import {INITIAL_STATE} from "./modules/data/game";
import HeaderView from "./views/header-view";
import FooterView from "./views/footer-view";
import {createGameLevelWelcome} from "./util";

const appElement = document.querySelector(`.app`);
let state = Object.assign({}, INITIAL_STATE);

const startGame = () => {
  const header = new HeaderView(state);
  const footer = new FooterView();
  const welcome = createGameLevelWelcome();

  appElement.appendChild(header.element);
  appElement.appendChild(welcome);
  appElement.appendChild(footer.element);
};

startGame();

export default startGame;
