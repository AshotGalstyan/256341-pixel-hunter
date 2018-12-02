import {resize} from './data/resize.js';
import {SLOW_LIMIT, FAST_LIMIT, QUIZ_RESULTS} from './constants.js';

export const createImage = (src, alt, title, holderSize, imageSize) => {

  const size = resize(holderSize, imageSize);

  return `<img src="${src}" alt="${alt}" width="${size.width}" height="${size.height}" ${(title.length > 0 ? `title="` + title + `"` : ``)}>`;

};

export const rankingAnswer = (time) => {

  if (time > SLOW_LIMIT) {
    return QUIZ_RESULTS.slow.type;
  }
  else if (time < FAST_LIMIT) {
    return QUIZ_RESULTS.fast.type;
  }
  return QUIZ_RESULTS.correct.type;
}

export const showCurrentState = (answers, total) => {

  let out = ``;

  for (let i = 0; i < total; i++) {
    out += `<li class="stats__result stats__result--` + (i < answers.length ? answers[i] : `unknown`) + `"></li>`;
  }

  return out;

};

export const randomElement = (fromArray = [], n = 1) => {

  if (fromArray.length === 0) {
    return [];
  }
  return fromArray.sort(() => 0.5 - Math.random()).slice(0, n);
};

export const randomSort = () => 0.5 - Math.random();

export const selectImages = (source, total = 1) => source.sort(() => 0.5 - Math.random()).slice(0,total);

export const selectImagesPhotoPaint = (source, photo = 1, paint = 1) => {
  const randomPhotos = source.filter((el) => IMAGES.get(el).type === `photo`).sort(() => 0.5 - Math.random());
  const randomPaints = source.filter((el) => IMAGES.get(el).type === `paint`).sort(() => 0.5 - Math.random());
  return randomPhotos.slice(photo).concat(randomPaints.slice(paint)).sort(() => 0.5 - Math.random());
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
