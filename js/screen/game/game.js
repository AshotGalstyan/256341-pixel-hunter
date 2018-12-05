// import GameView from './game-view.js';
import HeaderView from '../../common/header-view.js';
import Timer from '../../common/timer.js';
import Layout1View from './layout-1-view.js';
import Layout2View from './layout-2-view.js';
import Layout3View from './layout-3-view.js';
import Layout4View from './layout-4-view.js';

import {compareRandom, rankingAnswer} from "../../common/utilites.js";
import {MAX_TIME_LIMIT, MAX_LIVES, TOTAL_STEPS, QUIZ_RESULTS, CRITICAL_TIME} from '../../common/constants.js';

const LayoutClasses = {
  layout1: Layout1View,
  layout2: Layout2View,
  layout3: Layout3View,
  layout4: Layout4View
};

const livesLine = (lives, total) => {

  const template = [
    `<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="31" height="27">`,
    `<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`
  ];

  const tmp = Array.from(`0`.repeat(total - lives) + `1`.repeat(lives));

  return tmp.map((el) => template[el]).join(` `);

};

const generateScreenplay = (totalSteps) => {

  const layouts = Object.keys(LayoutClasses);

  const out = [];
  let previousLayout = ``;

  for (let i = 0; i < totalSteps; i++) {
    const candidates = layouts.filter((el) => el !== previousLayout);
    const layout = (candidates.length === 0 ? previousLayout : candidates.sort(() => compareRandom())[0]);
    previousLayout = layout;
    out.push(layout);
  }
  return out;
};

const timeCategorization = (time) => (time > CRITICAL_TIME ? time : `<span class="dangertime">` + time + `</span>`);

export default class gameScreen {

  constructor(router, model) {
    this.router = router;
    this.model = model;
    this.timer = new Timer(MAX_TIME_LIMIT);
    this.screenplay = generateScreenplay(TOTAL_STEPS);

    this.root = document.createElement(`div`);

    this.updateHeader();
    this.updateContent();

    this.root.appendChild(this.header.element);
    this.root.appendChild(this.quest.element);

    this.start();
  }

  get element() {
    return this.root;
  }

  start() {
    this.reset();
    this.intervalId = setInterval(() => {
      const time = this.timer.tick();
      this.updateHeader();
      if (time === `finished`) {
        this.reset();
        this.answer(QUIZ_RESULTS.dead.type);
      }
    }, 1000);
  }

  reset() {
    this.timer.reset();
    clearInterval(this.intervalId);
  }

  updateHeader() {
    const lives = livesLine(this.model.getCurrentLives(), MAX_LIVES);
    const timer = timeCategorization(this.timer.getTime());
    const header = new HeaderView(timer, lives);

    header.onClick = () => {
      header.unbind();
      this.router.showRules();
    };

    if (this.header) {
      this.root.replaceChild(header.element, this.header.element);
    }
    this.header = header;
  }

  updateContent() {
    const quest = new LayoutClasses[this.screenplay[this.model.getCurrentStep()]]();

    if (this.quest) {
      this.root.replaceChild(quest.element, this.quest.element);
    }
    this.quest = quest;
  }

  answer(result) {
    if (result === QUIZ_RESULTS.dead.type) {
      this.model.die();
      this.model.addAnswer(result);
    } else {
      this.model.addAnswer(rankingAnswer(this.timer.getTime()));
    }

    this.model.nextStep();

    if (this.model.canContinue()) {
      this.updateContent();
      this.updateHeader();
      this.start();
    } else {
      this.header.unbind();
      this.quest.unbind();
      this.router.showStat(this.model.getAnswers(), this.model.getCurrentLives());
    }
  }
}
