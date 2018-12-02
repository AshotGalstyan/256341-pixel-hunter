import StatView from './stat-view.js';
import HeaderView from '../../header-view.js';
import {changeScreen, buildFragment} from '../../utilites.js';

export default (gameConfig, answers, lives) => {

  const header = new HeaderView();
  const stat = new StatView(gameConfig.playerName, answers, lives);

  header.onClick = () => {
    header.unbind();
    changeScreen(gameConfig.beginPoint());
  };

  return buildFragment([header.element, stat.element]);

};
