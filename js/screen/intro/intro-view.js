import AbstractView from '../../common/abstract-view.js';

export default class IntroView extends AbstractView {
  get template() {
    return `
      <section class="intro">
        <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
        <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
      </section>
      `;
  }

  bind() {
    this.nextButton = this.element.querySelector(`.intro__asterisk`);
    this.nextButton.addEventListener(`click`, this.onClick);
  }

  unbind() {
    this.nextButton.removeEventListener(`click`, this.onClick);
  }

  onClick() {}
}
