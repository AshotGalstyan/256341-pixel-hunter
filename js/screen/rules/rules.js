import RulesView from './rules-view.js';

export default (router) => {

  const rules = new RulesView();

  rules.onClick = (evt) => {
    evt.preventDefault();
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
