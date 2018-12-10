import GameModel from '../model/model.js';
import IntroScreen from '../screen/intro/intro.js';
import GreetingScreen from '../screen/greeting/greeting.js';
import rulesScreen from '../screen/rules/rules.js';
import statScreen from '../screen/stat/stat.js';
import GameScreen from '../screen/game/game.js';
import errorScreen from '../screen/error/error.js';
import Loader from './loader.js';

const mainElement = document.querySelector(`#main`);

const changeScreen = (wrapper, ...elements) => {
  wrapper.innerHTML = ``;
  for (const element of elements) {
    wrapper.appendChild(element);
  }
};

let gameData;

export default class Application {

  static start() {
    const intro = new IntroScreen();
    const greeting = new GreetingScreen(this);
    changeScreen(mainElement, intro.element, greeting.element);

    Loader.loadData()
      .then((data) => {
        gameData = data;
      })
      .then(() => Application.hideIntro(intro, greeting))
      .catch((err) => Application.showError(err));
  }

  static hideIntro(intro, greeting) {
    intro.fadeOut();
    greeting.fadeIn();
  }

  static showGreeting() {
    const greeting = new GreetingScreen(this);
    greeting.fadeIn();
    changeScreen(mainElement, greeting.element);
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

  static saveCurrentGameResults(answers, lives, playerName) {
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
