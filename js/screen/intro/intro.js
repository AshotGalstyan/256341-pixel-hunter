import IntroView from './intro-view.js';
import {changeScreen} from '../../utilites.js';
import greeting from '../greeting/greeting.js';

export default () => {
  const intro = new IntroView();
  intro.onClick = () => {
    intro.unbind();
    changeScreen(greeting());
  };

  return intro.element;
};
