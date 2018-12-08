export const DEBUG = true;

export const MAX_LIVES = 3;
export const TOTAL_STEPS = 10;
export const MAX_TIME_LIMIT = 30;
export const LIVES_TO_POINT = 50;
export const FAST_LIMIT = 20;
export const SLOW_LIMIT = 10;
export const CRITICAL_TIME = 5;
export const TOTAL_TITLE_FOR_FAILED = `fail`;

export const QUIZ_RESULTS = {
  incompleate: {type: `incompleate`, points: 0},
  correct: {type: `correct`, points: 100},
  fast: {type: `fast`, points: 150},
  slow: {type: `slow`, points: 50},
  wrong: {type: `wrong`, points: 0},
  dead: {type: `dead`, points: 0}
};

export const STAT_INFO = {
  correct: {title: ``, bonus: QUIZ_RESULTS.correct.points},
  fast: {title: `Бонус за скорость:`, bonus: QUIZ_RESULTS.fast.points - QUIZ_RESULTS.correct.points},
  lives: {title: `Бонус за жизни:`, bonus: LIVES_TO_POINT},
  slow: {title: `Штраф за медлительность:`, bonus: QUIZ_RESULTS.slow.points - QUIZ_RESULTS.correct.points},
  total: {title: ``}
};
