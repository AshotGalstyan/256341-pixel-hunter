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

export const LAYOUTS = [`layout-1`, `layout-2`, `layout-3`, `layout-4`];

export const INITIAL_STATE = Object.freeze({
  step: 0,
  lives: MAX_LIVES,
  currentStepTime: MAX_TIME_LIMIT
});
