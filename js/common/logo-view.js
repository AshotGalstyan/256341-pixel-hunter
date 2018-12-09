import AbstractView from './abstract-view.js';

export default class LogoView extends AbstractView {

  get wrapperTag() {
    return `button`;
  }
  get wrapperAttributes() {
    return {class: `back`};
  }
  get template() {
    return `
      <span class="visually-hidden">Вернуться к началу</span>
      <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
        <use xlink:href="img/sprite.svg#arrow-left"></use>
      </svg>
      <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
        <use xlink:href="img/sprite.svg#logo-small"></use>
      </svg>
      `;
  }

  bind() {
    this.backButton = this.element;
    this.backButton.addEventListener(`click`, this.onClick);
  }

  unbind() {
    this.backButton.removeEventListener(`click`, this.onClick);
  }

  onClick() {}
}
