import {changeScreen, render, showCurrentState} from './utilites.js';
import {showIntro} from './intro.js';
import logo from './logo.js';
import {showLevel1} from './level-1.js';
import {showLevel2} from './level-2.js';
import {showLevel3} from './level-3.js';
import {showStats} from './stats.js';

import {PIXEL_HUNTER} from './data/game-data.js';
import {INITIAL_GAME, TESTS_COUNT} from './data/data.js';

const renderLives = (currentLives, totalLives) => {

  let out = ``;

  for (let i = 0; i < totalLives - currentLives - 1; i++) {
    out += `<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`;
  }

  for (let i = 0; i <= currentLives; i++) {
    out += `<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`;
  }
  return out;
};

const goNextLevel = (state, answers) => {

  // Fix Current results
  const currentLevel = PIXEL_HUNTER[state.level];

  let currResult = false;
  if (JSON.stringify(currentLevel.answers) === JSON.stringify(answers)) {
    currResult = true;
  }

  // document.querySelector(`#debug`).innerHTML = currResult + `|currentLevel: ` + JSON.stringify(currentLevel.answers) + `, real: ` + JSON.stringify(answers);

  const StepTime = Math.floor(Math.random() * 30) + 1;

  let result = `correct`;
  if (currResult) {
    if (StepTime < 10) {
      result = `fast`;
    } else if (StepTime > 20) {
      result = `slow`;
    }
  } else {
    result = `wrong`;
  }

  state.answers.push(result);

  if (state.level < TESTS_COUNT - 1) {

    state.level += 1;

    // document.querySelector(`#debug`).innerHTML = `TESTS_COUNT: ` + TESTS_COUNT +`, state: ` + JSON.stringify(state);

    updateGame(state);

  } else {

    // document.querySelector(`#debug`).innerHTML = `showStats -- TESTS_COUNT: ` + TESTS_COUNT +`, state: ` + JSON.stringify(state);

    showStats(state);

  }
};

const updateGame = (state) => {

  const currentLevel = PIXEL_HUNTER[state.level];

  let template = `
  <header class="header">` + logo + `
    <div class="game__timer">NN</div>
    <div class="game__lives">` + renderLives(state.livesRemaining, state.livesRemaining + 1) + `</div>
  </header>
  <section class="game">
    <p class="game__task">` + currentLevel.title + `</p>`;

  switch (currentLevel.case) {
    case 1:
      template += showLevel1(currentLevel);
      break;
    case 2:
      template += showLevel2(currentLevel);
      break;
    default:
      template += showLevel3(currentLevel);
  }

  template += `
    <ul class="stats">` + showCurrentState(state.answers, TESTS_COUNT) + `</ul>
  </section>
  `;

  const element = render(template);

  changeScreen(element);

  const backButton = element.querySelector(`.back`);
  backButton.addEventListener(`click`, () => {
    showIntro();
  });

  // Add Listeners
  const gameFormClasses = Array.from(element.querySelector(`.game__content`).classList);
  if (gameFormClasses.length === 1) {
    const controls = element.querySelectorAll(`input[type="radio"]`);

    controls.forEach((control) => {
      control.addEventListener(`click`, () => {
        selectionTest();
      });
    });

    const selectionTest = () => {
      if (element.querySelectorAll(`input[type="radio"]:checked`).length === 2) {
        const levelAnswers = [];
        for (let el of element.querySelectorAll(`input[type="radio"]:checked`)) {
          levelAnswers.push(el.value);
        }

        goNextLevel(state, levelAnswers);
      }
    };
  } else {
    if (gameFormClasses.indexOf(`game__content--wide`) > -1) {

      const controls = element.querySelectorAll(`input[type="radio"]`);

      controls.forEach((control) => {
        control.addEventListener(`click`, () => {
          goNextLevel(state, [control.value]);
        });
      });

    } else {

      const controls = element.querySelectorAll(`.game__option`);

      controls.forEach((control) => {
        control.addEventListener(`click`, () => {
          goNextLevel(state, [control.dataset.number]);
        });
      });

    }
  }
};

export const showGame = () => {

  let game = Object.assign({}, INITIAL_GAME);

  updateGame(game);

};

showGame();
