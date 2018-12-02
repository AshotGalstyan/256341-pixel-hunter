import RulesView from './rules-view.js';
import {changeScreen} from '../../utilites.js';
import game from '../game/game.js';


export default (gameConfig) => {
  const rules = new RulesView();
  rules.playerName = gameConfig[`playerName`];

  rules.onClick = () => {
    if (rules.name.value.trim() !== ``) {
      rules.unbind();

      gameConfig.playerName = rules.name.value.trim();
      changeScreen(game(gameConfig));
    }
  };

  rules.onInputName = () => {
    if (rules.name.value.trim() !== ``) {
      rules.nextButton.disabled = false;
    } else {
      rules.name.value = ``;
      rules.nextButton.disabled = true;
    }
  };

  return rules.element;
};
