import AbstractView from './abstract-view.js';
import {MAX_TIME_LIMIT} from './constants.js';

export default class HeaderView extends AbstractView {
  constructor(time = -1, lives = -1) {
    super();
    this.time = (time !== -1 ? `<div class="game__timer">` + (time > MAX_TIME_LIMIT ? `<span style="color: #DE4D51;">` + time + `</style>` : time) + `</div>` : ``);
    this.lives = (lives !== -1 ? `<div class="game__timer">` + lives + `</div>` : ``);
  }

  get template() {
    return `
      <header class="header">
        <button class="back">
          <span class="visually-hidden">Вернуться к началу</span>
          <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
            <use xlink:href="img/sprite.svg#arrow-left"></use>
          </svg>
          <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
            <use xlink:href="img/sprite.svg#logo-small"></use>
          </svg>
        </button>
        ${this.time}
        ${this.lives}
      </header>
      `;
  }

  bind() {
    this.backButton = this.element.querySelector(`.back`);
    this.backButton.addEventListener(`click`, this.onClick);
  }

  unbind() {
    this.backButton.removeEventListener(`click`, this.onClick);
  }

  onClick() {}
}
