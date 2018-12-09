import IntroView from './intro-view.js';

export default (out) => {

  const intro = new IntroView(out);

  return intro.element;

};
