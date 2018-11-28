import {changeScreen, randomElement, render, showCurrentState} from './utilites.js';
import {showHeader} from './header.js';
import {showStats} from './stats.js';
import {handleBackButton} from './back-button.js';
import {show1Col} from './game-1-col.js';
import {show2Col} from './game-2-col.js';
import {show3Col} from './game-3-col.js';
import {IMAGES} from './data/game-data.js';
import {INITIAL_GAME, TOTAL_STEPS, MAX_TIME_LIMIT, FAST_LIMIT, SLOW_LIMIT, LAYOUTS} from './data/data.js';

const countOfImagesType = (selected, imageType) => {

  if (selected.length === 0) {
    return 0;
  }

  return selected.reduce(function (accumulator, currentValue) {
    return accumulator + (IMAGES.get(currentValue).type === imageType);
  }, 0);
};

const takeFixedImages = (from, imageType) => {

  let index = 0;
  let selected = [];

  while (selected.length < 3) {

    index = (index === from.length - 1 ? 0 : index + 1);

    const neededAspect = (countOfImagesType(selected, imageType) === 1 ? false : true);

    if (neededAspect) {
      if (selected.indexOf(from[index]) === -1 && IMAGES.get(from[index]).type === imageType) {
        selected.push(from[index]);
      }
    } else {
      if (selected.indexOf(from[index]) === -1 && IMAGES.get(from[index]).type !== imageType) {
        selected.push(from[index]);
      }
    }
  }

  return selected.sort(() => 0.5 - Math.random());

};

const generateScreenplay = (gameImages, layouts, totalSteps) => {

  let out = [];

  const srcs = [...gameImages.keys()];
  const layoutTypes = [...layouts.keys()];

  let previousLayout = ``;

  for (let i = 0; i < totalSteps; i++) {

    const candidates = randomElement(layoutTypes, 2);

    let layout = (candidates[0].substr(0, 1) !== previousLayout.substr(0, 1) ? candidates[0] : candidates[1]);
    previousLayout = layout;

    let images;

    switch (layout) {
      case `2 Columns`:
        images = randomElement(srcs, 2);
        break;
      case `3 Columns with photo`:
        images = takeFixedImages(srcs, `photo`);
        break;
      case `3 Columns with paint`:
        images = takeFixedImages(srcs, `paint`);
        break;
      default:
        images = randomElement(srcs, 1);
    }
    out.push({layout, images});
  }
  return out;
};

const gameStepShow = (stepScreenplay) => {

  if (stepScreenplay.layout === `1 Columns`) {

    return show1Col(stepScreenplay.layout, stepScreenplay.images);

  } if (stepScreenplay.layout === `2 Columns`) {

    return show2Col(stepScreenplay.layout, stepScreenplay.images);
  }

  return show3Col(stepScreenplay.layout, stepScreenplay.images);

};

const analysisResponse = (layout, images, levelAnswers) => {

  const StepTime = Math.floor(Math.random() * 30) + 1;

  let trueAnswers = [];
  let realAnswers = [];

  if (layout === `1 Columns`) {
    trueAnswers.push(IMAGES.get(images[0]).type);
    realAnswers = levelAnswers;
  } else if (layout === `2 Columns`) {
    trueAnswers.push(IMAGES.get(images[0]).type);
    trueAnswers.push(IMAGES.get(images[1]).type);
    realAnswers = levelAnswers;
  } else {
    trueAnswers.push(IMAGES.get(images[0]).type);
    realAnswers.push(IMAGES.get(levelAnswers[0]).type);
  }

  let result = `wrong`;
  if (trueAnswers.join() === realAnswers.join()) {
    result = `correct`;
    if (StepTime < FAST_LIMIT) {
      result = `fast`;
    } else if (StepTime > SLOW_LIMIT) {
      result = `slow`;
    }
  }

  return result;
};

const nextStep = (game, result) => {

  game.answers.push(result);
  game.currentStepTime = MAX_TIME_LIMIT;

  if (game.step < TOTAL_STEPS - 1) {
    game.step += 1;
  } else {
    game.gameOver = true;
  }

  return game;
};

const die = (game) => {
  if (!canContinue(game)) {
    game.gameOver = true;
  }
  game.lives -= 1;

  return game;
};

const canContinue = (game) => game.lives - 1 > 0;

const selectionTest = (backButtonRender, game, layout, images) => {

  const checkedControls = document.querySelectorAll(`.game__content input[type="radio"]:checked`);

  if (LAYOUTS.get(layout).answersCount === checkedControls.length) {

    const levelAnswers = [];
    for (const el of checkedControls) {
      levelAnswers.push(el.value);
    }

    const result = analysisResponse(layout, images, levelAnswers);

    if (Math.floor(Math.random() * 100) < 20) {
      game = die(game);
      game = nextStep(game, `wrong`);
    } else {
      game = nextStep(game, result);
    }

    if (game.gameOver) {
      showStats(game, backButtonRender);
    } else {
      updateGame(game, backButtonRender);
    }
  }
};

const updateGame = (game, backButtonRender) => {

  const template = `${showHeader(game.currentStepTime, game.lives)}
  <section class="game">
    ${gameStepShow(game.screenplay[game.step])}
    <ul class="stats">` + showCurrentState(game.answers, TOTAL_STEPS) + `</ul>
  </section>
  `;

  const element = render(template);

  handleBackButton(element, backButtonRender);

  // Checker Listeners
  const controls = element.querySelectorAll(`.game__content input[type="radio"]`);

  controls.forEach((control) => {
    control.addEventListener(`click`, () => {
      selectionTest(backButtonRender, game, game.screenplay[game.step].layout, game.screenplay[game.step].images);
    });
  });

  changeScreen(element);

};


export const showGame = (backButtonRender) => {

  let game = Object.assign({}, INITIAL_GAME);

  game.answers = [];
  game.screenplay = generateScreenplay(IMAGES, LAYOUTS, TOTAL_STEPS);

  updateGame(game, backButtonRender);

};

showGame();
