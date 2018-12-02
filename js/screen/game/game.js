import HeaderView from '../../header-view.js';
import Layout1View from './layout-1/layout-1-view.js';
import stat from '../stat/stat.js';
import {buildFragment, randomSort, changeScreen} from '../../utilites.js';
import {INITIAL_STATE, TOTAL_STEPS, MAX_LIVES, MAX_TIME_LIMIT, QUIZ_RESULTS, LAYOUTS} from '../../constants.js';

const LayoutClasses = {
  layout1: Layout1View,
  layout2: Layout1View,
  layout3: Layout1View,
  layout4: Layout1View
};

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

  return tmp.map((el) => template[el]).join(` `);

};

const statsLine = (answers, total) => {
  return answers.map((el) => `<li class="stats__result stats__result--` + el + `"></li>`).join(` `) + [...Array(total - answers.length)].map(() => `<li class="stats__result stats__result--unknown"></li>`).join(` `);
};

const canContinue = (state) => state.lives;

const die = (state) => {
  if (!canContinue(state)) {
    state.gameOver = true;
  }
  state.lives -= 1;

  return state;
};

const nextStep = (state, result) => {

  state.answers.push(result);
  state.currentStepTime = MAX_TIME_LIMIT;

  if (state.step < TOTAL_STEPS - 1) {
    state.step += 1;
  } else {
    state.gameOver = true;
  }

  return state;
};

const nextAction = (gameConfig, state, header, quest) => {

  if (quest.result !== QUIZ_RESULTS.incompleate.type) {
    if (quest.result === QUIZ_RESULTS.dead.type) {
      state = die(state);
    }
    state = nextStep(state, quest.result);

    if (state.gameOver) {
      header.unbind();
      quest.unbind();
      changeScreen(stat(gameConfig, state.answers, state.lives));
    }
  }

  changeScreen(gameUpdate(gameConfig, state));

};

const gameUpdate = (gameConfig, state) => {

  state.currentStepTime = Math.floor(Math.random() * 40) + 1;

  const header = new HeaderView(state.currentStepTime, livesLine(state.lives, MAX_LIVES));
  const quest = new LayoutClasses[state.screenplay[state.step]](statsLine(state.answers, TOTAL_STEPS));

  header.onClick = () => {
    header.unbind();
    changeScreen(gameConfig.beginPoint());
  };

  quest.onFinishQuest = () => {
    quest.answerTime = state.currentStepTime;
    nextAction(gameConfig, state, header, quest);
  };

  return buildFragment([header.element, quest.element]);

};

const game = (gameConfig) => {

  let state = Object.assign({}, INITIAL_STATE);

  state.answers = [];
  state.screenplay = generateScreenplay(LAYOUTS, TOTAL_STEPS);
  // console.log(`Begin: ` +  JSON.stringify(state));

  return gameUpdate(gameConfig, state);

};

export {game as default};
