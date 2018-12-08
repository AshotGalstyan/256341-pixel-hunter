import StatView from './stat-view.js';
import LogoView from '../../common/logo-view.js';
import {render} from '../../common/utilites.js';

export default (router, archive) => {

  const logo = new LogoView();
  logo.onClick = () => {
    logo.unbind();
    router.showRules();
  };

  const header = render([logo.element], `header`, {class: `header`});
  const stat = new StatView(archive);

  return render([header, stat.element]);

};
