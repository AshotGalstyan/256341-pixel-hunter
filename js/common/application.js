import {changeScreen} from './utilites.js';
import GameModel from '../model/model.js';
import introScreen from '../screen/intro/intro.js';
import greetingScreen from '../screen/greeting/greeting.js';
import rulesScreen from '../screen/rules/rules.js';
import statScreen from '../screen/stat/stat.js';
import GameScreen from '../screen/game/game.js';

import {ARCHIVE} from '../data/data.js';

const mainElement = document.querySelector(`#main`);

export default class Application {

  static showIntro() {
    const intro = introScreen(this);
    changeScreen(mainElement, intro);
  }

  static showGreeting() {
    const greeting = greetingScreen(this);
    changeScreen(mainElement, greeting);
  }

  static showRules() {
    const rules = rulesScreen(this);
    changeScreen(mainElement, rules);
  }

  static showGame(playerName) {
    const model = new GameModel(playerName);
    const game = new GameScreen(this, model);

    changeScreen(mainElement, game.element);
  }

  static showStat(answers, lives) {
    const stat = statScreen(this, answers, lives, ARCHIVE);
    changeScreen(mainElement, stat);
  }
}
