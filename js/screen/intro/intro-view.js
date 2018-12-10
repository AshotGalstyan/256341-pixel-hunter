import AbstractView from '../../common/abstract-view.js';

export default class IntroView extends AbstractView {

  get wrapperTag() {
    return `section`;
  }

  get wrapperAttributes() {
    return {class: `intro`};
  }

  get template() {
    return `
      <span class="intro__asterisk asterisk asterisk--animated">*</span>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    `;
  }

  fadeOut() {
    this.element.classList.add(`intro--done`);
  }
}
