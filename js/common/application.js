import {changeScreen} from './utilites.js';
import GameModel from '../model/model.js';
import introScreen from '../screen/intro/intro.js';
import greetingScreen from '../screen/greeting/greeting.js';
import rulesScreen from '../screen/rules/rules.js';
import statScreen from '../screen/stat/stat.js';
import GameScreen from '../screen/game/game.js';

import {ARCHIVE} from '../data/data.js';

const mainElement = document.querySelector(`#main`);

let gameSteps;
let imagesInfo;
let totalErrors;

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }
  throw new Error(`${response.status}: ${response.statusText}`);
};

const convertServerData = (serverData) => {
  const images = new Map();
  const screenplay = serverData.map((it) => {
    const step = {};
    step.type = it.type;
    step.question = it.question;
    step.size = {width: it.answers[0].image.width, height: it.answers[0].image.height};
    step.images = it.answers.map((el) => {
      const src = el.image.url;
      if (!images.has(src)) {
        images.set(src, {type: el.type, size: {width: 0, height: 0}});
      }
      return src;
    });

    switch (it.type) {
      case `tinder-like`:
        step.answers = [it.answers[0].image.type];
        break;
      case `one-of-three`:
        const photos = it.answers.filter((el) => el.type === `photo`);
        const paintings = it.answers.filter((el) => el.type === `painting`);
        step.answers = (paintings.length === 1 ? [paintings[0].image.url] : [photos[0].image.url]);
        break;
      case `two-of-two`:
        step.answers = [it.answers[0].image.type, it.answers[1].image.type];
        break;
    }
    return step;
  });
  return {images, screenplay};
};

const saveData = (data) => {

  gameSteps = data.screenplay;
  imagesInfo = data.images;

  return [...data.images.keys()];

};

const loadImage = (url) => {
  return new Promise((onLoad, onError) => {
    const image = new Image();
    image.onload = () => onLoad(image);
    image.onerror = () => onError(`Не удалось загрузить картнку: ${url}`);
    image.src = url;
  });
};

const fixImageSize = (images) => {
  images.forEach((it) => {

    const tmp = imagesInfo.get(it.src);
    tmp.size = {width: it.width, height: it.height};

    imagesInfo.set(it.src, tmp);
  });
};

const onError = (error) => {
  totalErrors += error;
};

export default class Application {

  static start() {
    fetch(`https://es.dump.academy/pixel-hunter/questions`)
        .then(checkStatus)
        .then((response) => response.json())
        .then(convertServerData)
        .then(saveData)
        .then((images) => images.map((it) => loadImage(it)))
        .then((imagePromises) => Promise.all(imagePromises))
        .then(fixImageSize)
        .then(Application.showIntro())
        .catch(onError);
  }

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
    model.screenplay = gameSteps;
    model.gameImages = imagesInfo;
    model.loadingErrors = totalErrors;

    const game = new GameScreen(this, model);

    changeScreen(mainElement, game.element);
  }

  static showStat(answers, lives) {
    const stat = statScreen(this, answers, lives, ARCHIVE);
    changeScreen(mainElement, stat);
  }
}
