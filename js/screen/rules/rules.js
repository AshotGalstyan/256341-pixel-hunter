import RulesView from './rules-view.js';
import {changeScreen} from '../../common/utilites.js';

export default (router) => {

  const rules = new RulesView();

  rules.onClick = () => {

    if (rules.name.value.trim() !== ``) {
      rules.unbind();
      router.showGame(rules.name.value.trim());
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
