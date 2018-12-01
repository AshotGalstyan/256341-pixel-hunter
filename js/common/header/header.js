import headerView from './header-view.js';

export default (time, lives) => {
  const header = new HeaderView();
  header.time = time;
  header.lives = time;

  return header.element;
};
