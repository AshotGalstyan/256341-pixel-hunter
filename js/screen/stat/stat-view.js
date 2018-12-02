import AbstractView from '../../abstract-view.js';
// import {ARCHIVE} from '../../data/game-data.js';

export default class Layout1View extends AbstractView {

  constructor(name, answers, lives) {
    super();
    this.name = name;
    this.answers = answers;
    this.lives = lives;
  }
  get template() {
    return `
      <section class="intro">
        <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
        <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
      </section>
      `;
  }
}
