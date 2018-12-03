import GreetingView from './greeting-view.js';
import {changeScreen} from '../../utilites.js';
import rules from '../rules/rules.js';

const greetingScreen = (gameConfig = {}) => {

  if (!(`beginPoint` in gameConfig)) {
    gameConfig.beginPoint = greetingScreen;
  }
  if (!(`playerName` in gameConfig)) {
    gameConfig.playerName = ``;
  }

  const greeting = new GreetingView();
  greeting.onClick = () => {
    greeting.unbind();
    changeScreen(rules(gameConfig));
  };

  return greeting.element;
};

export {greetingScreen as default};
