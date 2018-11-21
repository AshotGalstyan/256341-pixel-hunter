const TESTS_COUNT = 10;
const MAX_LEVELS = 4;
const MIN_LIVES = 0;
const MAX_LIVES = 2;
const MAX_TIME_LIMIT = 30;
const FAST_LIMIT = 10;
const SLOW_LIMIT = 20;
const ANSWER_TO_POINT_MAP = {
  normal: 100,
  fast: 150,
  slow: 50,
  incorrect: 0
};
const LIVES_TO_POINT = 50;

export const getScore = (answers = [], lives) => {

  if (!Array.isArray(answers) || answers.length !== TESTS_COUNT || typeof lives !== `number` || lives < MIN_LIVES || lives > MAX_LIVES) {
    return -1;
  }

  return answers.reduce((acc, answer) => acc + ANSWER_TO_POINT_MAP[answer], 0) + LIVES_TO_POINT * lives;
};

export const reduceLives = (lives) => {

  if (typeof lives !== `number` || lives <= MIN_LIVES || lives > MAX_LIVES) {
    return -1;
  }

  return lives - 1;

};

export const changeLevel = (game, level) => {

  const newGame = Object.assign({}, game, {
    level
  });

  if (typeof level !== `number` || level < 0 || level > MAX_LEVELS || level === Infinity || level === -Infinity) {
    newGame.level = -1;
  }

  return newGame;
};

export const changeTime = (game) => {

  const newGame = Object.assign({}, game, {currentStepTime: game.currentStepTime--});

  return newGame;

};

export const fixStepResult = (game, result = false) => {

  const newGame = Object.assign({}, game);

  if (result) {
    if (newGame.currentStepTime >= MAX_TIME_LIMIT - FAST_LIMIT) {
      newGame.answers.push(`fast`);
    } else if (newGame.currentStepTime <= MAX_TIME_LIMIT - SLOW_LIMIT) {
      newGame.answers.push(`slow`);
    } else {
      newGame.answers.push(`normal`);
    }
  } else {
    newGame.answers.push(`incorrect`);
  }

  newGame.currentStepTime = 0;

  return newGame;

};
