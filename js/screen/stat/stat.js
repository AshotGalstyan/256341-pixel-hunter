import StatView from './stat-view.js';
import LogoView from '../../common/logo-view.js';
import {render} from '../../common/utilites.js';

export default (router, answers, lives) => {

  const logo = new LogoView();
  logo.onClick = () => {
    logo.unbind();
    router.showRules();
  };

  const header = render([logo.element], `header`, {class: `header`});
  const stat = new StatView(answers, lives);

  return render([header, stat.element]);

};
