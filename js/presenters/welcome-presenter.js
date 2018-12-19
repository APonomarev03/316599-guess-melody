import WelcomeView from "../views/welcome-view";
import FooterView from "../views/footer-view";
import Application from "../application";

export default class WelcomePresenter {
  constructor() {
    this._view = new WelcomeView();
    this._root = document.createElement(`div`);
    this._root.appendChild(this._view.element);
    this._root.appendChild(new FooterView().element);
    this.bind();
  }

  get element() {
    return this._root;
  }

  bind() {
    this._view.onClick = () => {
      Application.showGame();
    };
  }
}

