import StatView from './stat-view.js';
import HeaderView from '../../common/header-view.js';
import {buildFragment} from '../../common/utilites.js';

export default (router, answers, lives) => {

  const header = new HeaderView();
  const stat = new StatView(answers, lives);

  header.onClick = () => {
    header.unbind();
    router.showRules();
  };

  return buildFragment([header.element, stat.element]);

};
