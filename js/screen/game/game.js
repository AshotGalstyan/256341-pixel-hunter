// import GameView from './game-view.js';
import LogoView from '../../common/logo-view.js';
import TimeTabloView from './time-tablo-view.js';
import LivesTabloView from './lives-tablo-view.js';

import Timer from '../../common/timer.js';
import Layout1View from './layout-1-view.js';
import Layout2View from './layout-2-view.js';
import Layout3View from './layout-3-view.js';
import Layout4View from './layout-4-view.js';

import {compareRandom, statsLine, render} from "../../common/utilites.js";
import {MAX_TIME_LIMIT, MAX_LIVES, TOTAL_STEPS, QUIZ_RESULTS, CRITICAL_TIME, SLOW_LIMIT, FAST_LIMIT} from '../../common/constants.js';

const LayoutClasses = {
  layout1: Layout1View,
  layout2: Layout2View,
  layout3: Layout3View,
  layout4: Layout4View
};

const rankingAnswer = (answer, time) => {

  if (time > FAST_LIMIT && answer === QUIZ_RESULTS.correct.type) {
    return QUIZ_RESULTS.fast.type;
  } else if (time < SLOW_LIMIT && answer === QUIZ_RESULTS.correct.type) {
    return QUIZ_RESULTS.slow.type;
  }
  return answer;
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
    this.allPartsReady = false;

    const logo = new LogoView();
    logo.onClick = () => {
      logo.unbind();
      this.router.showRules();
    };
    this.logoObject = logo;
    this.logo = logo.element;

    this.updateTimer();
    this.updateQuest();

    this.header = render([this.logo, this.timeTablo, this.livesTablo], `header`, {class: `header`});
    this.root = render([this.header, this.quest]);

    this.start();
  }

  get element() {
    return this.root;
  }

  updateHeader(newTimeTablo) {
    this.header.replaceChild(newTimeTablo, this.timeTablo);
  }

  updateTimer() {
    const timer = timeCategorization(this.timer.getTime());
    const timeTablo = new TimeTabloView(timer);

    if (this.allPartsReady) {
      this.updateHeader(timeTablo.element);
    }
    this.timeTablo = timeTablo.element;
  }

  updateQuest() {

    const livesTablo = new LivesTabloView(livesLine(this.model.getCurrentLives(), MAX_LIVES));
    if (this.allPartsReady) {
      this.header.replaceChild(livesTablo.element, this.livesTablo);
    }
    this.livesTablo = livesTablo.element;

    const quest = new LayoutClasses[this.screenplay[this.model.getCurrentStep()]](statsLine(this.model.answers, TOTAL_STEPS));
    this.questObject = quest;
    quest.onFinishQuest = () => {
      this.answer(this.questObject.result);
    };
    if (this.allPartsReady) {
      this.root.replaceChild(quest.element, this.quest);
    }
    this.quest = quest.element;
  }

  start() {
    this.allPartsReady = true;
    this.reset();
    this.intervalId = setInterval(() => {
      const time = this.timer.tick();
      this.updateTimer();
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

  answer(result) {
    if (result !== QUIZ_RESULTS.incompleate.type) {
      if (result === QUIZ_RESULTS.dead.type) {
        this.model.die();
        this.model.addAnswer(result);
      } else {
        this.model.addAnswer(rankingAnswer(result, this.timer.getTime()));
      }

      if (this.model.canContinue()) {
        this.reset();
        this.updateTimer();
        this.updateQuest();
        this.start();
      } else {
        this.reset();
        this.logoObject.unbind();
        this.questObject.unbind();
        this.router.showStat(this.model.getAnswers(), this.model.getCurrentLives());
      }
    }
  }
}
