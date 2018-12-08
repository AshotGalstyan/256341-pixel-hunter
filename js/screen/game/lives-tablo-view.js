import AbstractView from '../../common/abstract-view.js';

export default class LivesTabloView extends AbstractView {
  constructor(lives) {
    super();
    this.lives = lives;
  }

  get wrapperTag() {
    return `div`;
  }
  get wrapperAttributes() {
    return {class: `game__lives`};
  }
  get template() {
    return this.lives;
  }
}
