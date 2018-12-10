// import GameView from './game-view.js';
import LogoView from '../../common/logo-view.js';
import TimeTabloView from './time-tablo-view.js';
import LivesTabloView from './lives-tablo-view.js';
import ModalView from './modal-view.js';

import Timer from '../../common/timer.js';

import TinderLike from './tinder-like-view.js';
import OneOfThree from './one-of-three-view.js';
import TwoOfTwo from './two-of-two-view.js';

import {statsLine, render} from "../../common/utilites.js";
import {MAX_TIME_LIMIT, MAX_LIVES, TOTAL_STEPS, QUIZ_RESULTS, CRITICAL_TIME, SLOW_LIMIT, FAST_LIMIT} from '../../common/constants.js';

const LayoutClasses = {};
LayoutClasses[`tinder-like`] = TinderLike;
LayoutClasses[`one-of-three`] = OneOfThree;
LayoutClasses[`two-of-two`] = TwoOfTwo;

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

const timeCategorization = (time) => (time > CRITICAL_TIME ? time : `<span class="dangertime">` + time + `</span>`);

export default class gameScreen {

  constructor(router, model) {

    this.router = router;
    this.model = model;
    this.timer = new Timer(MAX_TIME_LIMIT);
    this.allPartsReady = false;

    const logo = new LogoView();
    logo.onClick = () => {
      this.freezTimer();
      this.showModal();
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

  showModal() {
    const modal = new ModalView();
    this.root.insertBefore(modal.element, this.root.firstChild);
    modal.dialog()
      .then(() => {
        this.router.showGreeting();
      })
      .catch(() => {
        this.unfreezTimer();
        this.root.removeChild(modal.element);
      });
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

  getTimerId() {
    return setInterval(() => {
      const time = this.timer.tick();
      this.updateTimer();
      if (time === `finished`) {
        this.reset();
        this.answer(QUIZ_RESULTS.dead.type);
      }
    }, 1000);
  }

  freezTimer() {
    this._freezedTime = this.timer.getTime();
    clearInterval(this.intervalId);
  }

  unfreezTimer() {
    this.timer.setTime(this._freezedTime);
    this.intervalId = this.getTimerId();
  }

  updateQuest() {

    const livesTablo = new LivesTabloView(livesLine(this.model.getCurrentLives(), MAX_LIVES));
    if (this.allPartsReady) {
      this.header.replaceChild(livesTablo.element, this.livesTablo);
    }
    this.livesTablo = livesTablo.element;

    const currentStep = this.model.screenplay[this.model.getCurrentStep()];

    const quest = new LayoutClasses[currentStep.type](currentStep, this.model.gameImages, statsLine(this.model.answers, TOTAL_STEPS));
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
    this.intervalId = this.getTimerId();
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
        this.router.saveCurrentGameResults(this.model.getAnswers(), this.model.getCurrentLives(), this.model.playerName);
      }
    }
  }
}
