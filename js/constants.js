export const debug = true;

export const MAX_LIVES = 3;
export const TOTAL_STEPS = 10;
export const MAX_TIME_LIMIT = 30;
export const LIVES_TO_POINT = 50;
export const FAST_LIMIT = 10;
export const SLOW_LIMIT = 20;

export const QUIZ_RESULTS = {
  incompleate: {type: `incompleate`, points: 0},
  correct: {type: `correct`, points: 100},
  fast: {type: `fast`, points: 150},
  slow: {type: `slow`, points: 50},
  wrong: {type: `wrong`, points: 0},
  dead: {type: `dead`, points: 0}
};

export const LAYOUTS = [`layout1`, `layout2`, `layout3`, `layout4`];

export const INITIAL_STATE = Object.freeze({
  step: 0,
  lives: MAX_LIVES,
  currentStepTime: MAX_TIME_LIMIT
});
