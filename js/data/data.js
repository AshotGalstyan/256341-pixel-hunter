const MAX_LIVES_REMAINING = 2;
const MAX_TIME_LIMIT = 30;
const FAST_LIMIT = 10;
const SLOW_LIMIT = 20;


export const LIVES_TO_POINT = 50;

export const ANSWER_TO_POINT_MAP = {
  correct: 100,
  fast: 150,
  slow: 50,
  wrong: 0
};

export const TESTS_COUNT = 10;

export const INITIAL_GAME = Object.freeze({
  level: 0,
  livesRemaining: MAX_LIVES_REMAINING,
  answers: [],
  currentStepTime: 30
});

export const reduceLives = (lives) => {

  if (typeof lives !== `number` || lives <= 0 || lives > MAX_LIVES_REMAINING) {
    return -1;
  }

  return lives - 1;

};

export const changeLevel = (game, level) => {

  const newGame = Object.assign({}, game, {
    level
  });

  if (typeof level !== `number` || level < 0 || level > MAX_LIVES_REMAINING || level === Infinity || level === -Infinity) {
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
