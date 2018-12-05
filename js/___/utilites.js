import {resize} from './data/resize.js';
import {IMAGES} from './data/game-data.js';
import {SLOW_LIMIT, FAST_LIMIT, QUIZ_RESULTS} from './constants.js';

export const compareRandom = () => 0.5 - Math.random();

export const createImage = (src, alt, holderSize, imageSize) => {

  const size = resize(holderSize, imageSize);

  return `<img src="${src}" alt="${alt}" width="${size.width}" height="${size.height}">`;

};

export const getTrueAnswer = (images, type) => {
  return images.filter((el) => IMAGES.get(el).type === type)[0];
};
export const rankingAnswer = (time) => {

  if (time > SLOW_LIMIT) {
    return QUIZ_RESULTS.slow.type;
  } else if (time < FAST_LIMIT) {
    return QUIZ_RESULTS.fast.type;
  }
  return QUIZ_RESULTS.correct.type;
};

export const showCurrentState = (answers, total) => {

  let out = ``;

  for (let i = 0; i < total; i++) {
    out += `<li class="stats__result stats__result--` + (i < answers.length ? answers[i] : `unknown`) + `"></li>`;
  }

  return out;

};

export const selectImages = (source, total = 1) => source.sort(() => compareRandom()).slice(0, total);

export const selectImagesPhotoPaint = (source, photo = 1, paint = 1) => {
  const randomPhotos = source.filter((el) => IMAGES.get(el).type === `photo`).sort(() => compareRandom());
  const randomPaints = source.filter((el) => IMAGES.get(el).type === `paint`).sort(() => compareRandom());
  return randomPhotos.slice(randomPhotos.length - photo).concat(randomPaints.slice(randomPaints.length - paint)).sort(() => compareRandom());
};

export const statsLine = (answers, total = 0) => {
  return answers.map((el) => `<li class="stats__result stats__result--` + el + `"></li>`).join(` `) + (total > 0 ? [...Array(total - answers.length)].map(() => `<li class="stats__result stats__result--unknown"></li>`).join(` `) : ``);
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
