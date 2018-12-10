import IntroView from './intro-view.js';

export default class IntroScreen {

  constructor() {
    this.root = new IntroView();
  }

  get element() {
    return this.root.element;
  }

  fadeOut() {
    this.root.fadeOut();
  }
}
