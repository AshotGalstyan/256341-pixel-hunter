import GreetingView from './greeting-view.js';
import {changeScreen} from '../../common/utilites.js';

export default (router) => {

  const greeting = new GreetingView();

  greeting.onClick = () => {
    greeting.unbind();
    router.showRules();
  };

  return greeting.element;
};
