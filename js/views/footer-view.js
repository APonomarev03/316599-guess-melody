import AbstractView from './abstract-view';

export default class FooterView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `<footer class="footer">
    <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">
      <img src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" alt="Creative Commons License" width="88" height="31" style="border-width:0">
    </a>
    <section class="copyright">
      <a class="copyright__logo" href="https://htmlacademy.ru"><img src="img/logo-htmla.svg" width="144" height="49" alt="HTML Academy"></a>
      <p class="copyright__text">Сделано в <a class="copyright__link" href="https://htmlacademy.ru">HTML Academy</a></p>
    </section>
  </footer>`;
  }

  bind() {}
}
