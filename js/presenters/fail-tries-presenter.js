import FailTriesView from "../views/fail-tries-view";
import Application from "../application";
import FooterView from "../views/footer-view";

export default class FailTriesPresenter {
  constructor() {
    this._screen = new FailTriesView();
    this._root = document.createElement(`div`);
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
