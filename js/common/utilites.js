import {SLOW_LIMIT, FAST_LIMIT, QUIZ_RESULTS} from './constants.js';

export const compareRandom = () => 0.5 - Math.random();

export const rankingAnswer = (time) => {
  if (time > SLOW_LIMIT) {
    return QUIZ_RESULTS.slow.type;
  } else if (time < FAST_LIMIT) {
    return QUIZ_RESULTS.fast.type;
  }
  return QUIZ_RESULTS.correct.type;
};

export const render = (template) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template.trim();
  return wrapper;
};

export const buildFragment = (elements) => {
  const fragment = document.createDocumentFragment();
  elements.forEach((element) => fragment.appendChild(element));
  return fragment;
};

const mainElement = document.querySelector(`#main`);

export const changeScreen = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element);
};
