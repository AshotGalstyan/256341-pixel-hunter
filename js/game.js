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

  return selected.reduce(function (accumulator, currentValue) {
    return accumulator + (IMAGES.get(currentValue).type === imageType);
  }, 0);
};

const takeFixedImages = (from, imageType) => {

  let index = 0;
  let selected = [];

  while (selected.length < 3) {

    index = (index === from.length - 1 ? 0 : index + 1);

    if (countOfImagesType(selected, imageType) === 1) {
      if (selected.indexOf(from[index]) === -1 && IMAGES.get(from[index]).type !== imageType) {
        selected.push(from[index]);
      }
    } else {
      if (selected.indexOf(from[index]) === -1 && IMAGES.get(from[index]).type === imageType) {
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

    const candidates = layoutTypes.filter((el) => el.substr(0, 1) !== previousLayout.substr(0, 1));
    const layout = candidates.sort(() => 0.5 - Math.random())[0];
    previousLayout = layout;

    const images = (LAYOUTS.get(layout).selectionWay === `image2type` ?
      randomElement(srcs, LAYOUTS.get(layout).totalImages) :
      takeFixedImages(srcs, LAYOUTS.get(layout).mandatory));

    const trueAnswers = (LAYOUTS.get(layout).selectionWay === `image2type` ?
      images.map((el) => IMAGES.get(el).type) :
      images.filter((el) => IMAGES.get(el).type === LAYOUTS.get(layout).mandatory));

    out.push({layout, images, trueAnswers});
  }
  return out;
};

const getTemplate = (stepScreenplay) => {

  if (stepScreenplay.layout === `1 Columns`) {
    return show1Col(stepScreenplay.layout, stepScreenplay.images);
  } else if (stepScreenplay.layout === `2 Columns`) {
    return show2Col(stepScreenplay.layout, stepScreenplay.images);
  } else {
    return show3Col(stepScreenplay.layout, stepScreenplay.images);
  }
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

const canContinue = (game) => game.lives;

const selectionTest = (backButtonRender, game) => {

  const layout = game.screenplay[game.step].layout;

  const checkedControls = document.querySelectorAll(`.game__content input[type="radio"]:checked`);

  if (LAYOUTS.get(layout).answersCount === checkedControls.length) {

    const levelAnswers = [...checkedControls].map((el) => el.value);

    if (levelAnswers.every((el) => game.screenplay[game.step].trueAnswers.indexOf(el) > -1)) {

      const StepTime = Math.floor(Math.random() * 40) + 1;

      if (StepTime > MAX_TIME_LIMIT) {
        game = die(game);
        game = nextStep(game, `dead`);
      } else if (StepTime > SLOW_LIMIT) {
        game = nextStep(game, `slow`);
      } else if (StepTime < FAST_LIMIT) {
        game = nextStep(game, `fast`);
      } else {
        game = nextStep(game, `correct`);
      }
    } else {
      game = nextStep(game, `wrong`);
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
    ${getTemplate(game.screenplay[game.step])}
    <ul class="stats">` + showCurrentState(game.answers, TOTAL_STEPS) + `</ul>
  </section>
  `;

  const element = render(template);

  handleBackButton(element, backButtonRender);

  // Checker Listeners
  const controls = element.querySelectorAll(`.game__content input[type="radio"]`);

  controls.forEach((control) => {
    control.addEventListener(`click`, () => {
      selectionTest(backButtonRender, game);
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
