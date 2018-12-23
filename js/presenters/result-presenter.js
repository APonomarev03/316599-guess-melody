import ResultSuccessView from "../views/result-success-view";
import Application from "../application";
import FooterView from "../views/footer-view";

export default class ResultPresenter {
  constructor(state, results) {
    this._screen = new ResultSuccessView(state, results);
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
