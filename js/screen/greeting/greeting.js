import GreetingView from './greeting-view.js';

export default class GreetingScreen {

  constructor(router) {
    this.router = router;
    const greeting = new GreetingView();
    greeting.onClick = () => {
      greeting.unbind();
      router.showRules();
    };
    this.root = greeting;
  }

  get element() {
    return this.root.element;
  }

  fadeIn() {
    this.root.fadeIn();
  }
}
