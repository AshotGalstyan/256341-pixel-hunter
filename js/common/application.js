import GameModel from '../model/model.js';
import introScreen from '../screen/intro/intro.js';
import greetingScreen from '../screen/greeting/greeting.js';
import rulesScreen from '../screen/rules/rules.js';
import statScreen from '../screen/stat/stat.js';
import GameScreen from '../screen/game/game.js';
import errorScreen from '../screen/error/error.js';
import Loader from './loader.js';

const mainElement = document.querySelector(`#main`);

const changeScreen = (wrapper, element) => {
  wrapper.innerHTML = ``;
  wrapper.appendChild(element);
};

const change2Screens = (wrapper, element1, element2) => {
  wrapper.innerHTML = ``;
  wrapper.appendChild(element1);
  wrapper.appendChild(element2);
};

let gameData;

export default class Application {

  static start() {
    const intro = introScreen();
    changeScreen(mainElement, intro);

    Loader.loadData()
      .then((data) => {
        gameData = data;
      })
      .then(() => Application.hideIntro())
      .catch((err) => Application.showError(err));
  }

  static hideIntro() {
    const intro = introScreen(true);
    const greeting = greetingScreen(this);
    change2Screens(mainElement, intro, greeting);
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
    model.screenplay = gameData.gameSteps;
    model.gameImages = gameData.imagesInfo;

    const game = new GameScreen(this, model);

    changeScreen(mainElement, game.element);
  }

  static fixStat(answers, lives, playerName) {
    Loader.saveResults({answers, lives}, playerName)
      .then(() => Loader.loadResults(playerName))
      .then((data) => Application.showStat(data, playerName))
      .catch((err) => Application.showError(err));
  }

  static showStat(date) {
    const stat = statScreen(this, date);
    changeScreen(mainElement, stat);
  }

  static showError(err) {
    const errorModal = errorScreen(err);
    changeScreen(mainElement, errorModal);
  }
}
