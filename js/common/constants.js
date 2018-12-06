export const DEBUG = true;

export const MAX_LIVES = 3;
export const TOTAL_STEPS = 10;
export const MAX_TIME_LIMIT = 30;
export const LIVES_TO_POINT = 50;
export const FAST_LIMIT = 20;
export const SLOW_LIMIT = 10;
export const CRITICAL_TIME = 5;

export const QUIZ_RESULTS = {
  incompleate: {type: `incompleate`, points: 0},
  correct: {type: `correct`, points: 100},
  fast: {type: `fast`, points: 150},
  slow: {type: `slow`, points: 50},
  wrong: {type: `wrong`, points: 0},
  dead: {type: `dead`, points: 0}
};

export const IMAGE_TYPES = {
  photo: `photo`,
  paint: `paint`
};

export const LAYOUT_CLASSES = {
  layout1: `Layout1View`,
  layout2: `Layout2View`,
  layout3: `Layout3View`,
  layout4: `Layout4View`
};
