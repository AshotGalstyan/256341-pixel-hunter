import IntroView from './intro-view.js';

export default (router) => {

  const intro = new IntroView();

  intro.onClick = () => {
    intro.unbind();
    router.showGreeting();
  };

  return intro.element;
};
