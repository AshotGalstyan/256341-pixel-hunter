import AbstractView from '../../common/abstract-view.js';

export default class IntroView extends AbstractView {

  constructor(out) {
    super();
    this.sectionClasses = (out ? `intro intro--done` : `intro`);
  }

  get template() {
    return `
      <section class="${this.sectionClasses}">
        <span class="intro__asterisk asterisk asterisk--animated">*</span>
        <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
      </section>
      `;
  }
}
