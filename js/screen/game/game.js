import HeaderView from '../../header-view.js';
import Layout1View from './layout-1/layout-1-view.js';
import {buildFragment, randomSort, changeScreen} from '../../utilites.js';
import {INITIAL_STATE, TOTAL_STEPS, MAX_LIVES, LAYOUTS} from '../../constants.js';

const layoutCases = {Layout1View};

const CurrentLayout = (layout) => layoutCases[layout];

const generateScreenplay = (layouts, totalSteps) => {

  let out = [];
  let previousLayout = ``;

  for (let i = 0; i < totalSteps; i++) {
    const candidates = layouts.filter((el) => el !== previousLayout);
    const layout = (candidates.length === 0 ? previousLayout : candidates.sort(() => randomSort())[0]);
    previousLayout = layout;
    out.push(layout);
  }
  return out;
};

const livesLine = (lives, total) => {

  const template = [
    `<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="31" height="27">`,
    `<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`
  ];

  const tmp = Array.from(`0`.repeat(total - lives) + `1`.repeat(lives));

  return tmp.map((el) => template[el]);

};

const statsLine = (answers, total) => {
  return answers.map((el) => `<li class="stats__result stats__result--` + el + `"></li>`) + [...Array(total - answers.length)].map(() => `<li class="stats__result stats__result--unknown"></li>`);
};

const gameUpdate = (gameConfig, state) => {

  const header = new HeaderView(state.currentStepTime, livesLine(state.lives, MAX_LIVES));
  const quest = new CurrentLayout(state.screenplay[state.step])(statsLine(state.answers, TOTAL_STEPS));

  header.onClick = () => {
    header.unbind();
    changeScreen(gameConfig.beginPoint());
  };

  return buildFragment([header.element, quest.element]);

};

const game = (gameConfig) => {

  let state = Object.assign({}, INITIAL_STATE);

  state.answers = [];
  state.screenplay = generateScreenplay(LAYOUTS, TOTAL_STEPS);

  return gameUpdate(gameConfig, state);

};

export {game as default};
