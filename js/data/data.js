export const debug = true;

export const MAX_LIVES = 3;
export const TOTAL_STEPS = 10;
export const MAX_TIME_LIMIT = 30;
export const LIVES_TO_POINT = 50;
export const FAST_LIMIT = 10;
export const SLOW_LIMIT = 20;

// Add new state "dead" for wrong answer by Time limit
export const ANSWER_TO_POINT_MAP = {
  correct: 100,
  fast: 150,
  slow: 50,
  wrong: 0,
  dead: 0
};

export const LAYOUTS = new Map([
  [
    `2 Columns`,
    {
      title: `Угадайте для каждого изображения фото или рисунок?`,
      totalImages: 2,
      mandatory: ``,
      answersCount: 2,
      selectionWay: `image2type`,
      width: 468,
      height: 458
    }
  ],
  [
    `1 Columns`,
    {
      title: `Угадай, фото или рисунок?`,
      totalImages: 1,
      mandatory: ``,
      answersCount: 1,
      selectionWay: `image2type`,
      width: 705,
      height: 455
    }
  ],
  [
    `3 Columns with photo`,
    {
      title: `Найдите фото среди изображений`,
      totalImages: 3,
      mandatory: `photo`,
      answersCount: 1,
      selectionWay: `type2image`,
      width: 304,
      height: 455
    }
  ],
  [
    `3 Columns with paint`,
    {
      title: `Найдите рисунок среди изображений`,
      totalImages: 3,
      mandatory: `paint`,
      answersCount: 1,
      selectionWay: `type2image`,
      width: 304,
      height: 455
    }
  ]
]);

export const INITIAL_STATE = Object.freeze({
  step: 0,
  lives: MAX_LIVES,
  currentStepTime: MAX_TIME_LIMIT
});


export const changeTime = (game) => {

  const newGame = Object.assign({}, game, {currentStepTime: game.currentStepTime--});

  return newGame;

};
