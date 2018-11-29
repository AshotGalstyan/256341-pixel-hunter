import {resize} from './data/resize.js';

export const createImage = (src, alt, title, holderSize, imageSize) => {

  const size = resize(holderSize, imageSize);

  return `<img src="${src}" alt="${alt}" width="${size.width}" height="${size.height}" ${(title.length > 0 ? `title="` + title + `"` : ``)}>`;

};


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

export const render = (template) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template.trim();
  return wrapper;
};

const mainElement = document.querySelector(`#main`);

export const changeScreen = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element);
};
