import FailTriesView from "../views/fail-tries-view";
import Application from "../application";
import FooterView from "../views/footer-view";

export default class FailTriesPresenter {
  constructor() {
    this.screen = new FailTriesView();
    this.footer = new FooterView();
    this._root = document.createElement(`div`);
    this._root.appendChild(this.screen.element);
    this._root.appendChild(this.footer.element);
    this.bind();
  }

  get element() {
    return this._root;
  }

  bind() {
    this.screen.onReplay = () => {
      Application.showGame();
    };
  }
}
