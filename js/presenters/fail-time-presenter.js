import FailTimeView from "../views/fail-time-view";
import FooterView from "../views/footer-view";
import Application from "../application";

export default class FailTimePresenter {
  constructor() {
    this._screen = new FailTimeView();
    this._root = document.createElement(`span`);
    this._root.appendChild(this._screen.element);
    this._root.appendChild(new FooterView().element);
    this.bind();
  }

  get element() {
    return this._root;
  }

  bind() {
    this._screen.onReplay = () => {
      Application.showGame();
    };
  }
}
