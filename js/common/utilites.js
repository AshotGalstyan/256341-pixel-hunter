import {IMAGES} from '../data/data.js';

export const compareRandom = () => 0.5 - Math.random();

export const resize = (holder, original) => {
  const ratioWidth = original.width / holder.width;
  const ratioHeight = original.height / holder.height;
  const ratio = Math.max(ratioWidth, ratioHeight);
  return {width: Math.floor(original.width / ratio), height: Math.floor(original.height / ratio)};
};

export const createImage = (src, alt, holderSize, imageSize) => {

  const size = resize(holderSize, imageSize);

  return `<img src="${src}" alt="${alt}" width="${size.width}" height="${size.height}">`;

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

export const getTrueAnswer = (images, type) => {
  return images.filter((el) => IMAGES.get(el).type === type)[0];
};

export const render = (inner, wrapperTag = `div`, wrapperAttributes = {}) => {
  const wrapper = document.createElement(wrapperTag);
  for (const key in wrapperAttributes) {
    if (wrapperAttributes.hasOwnProperty(key)) {
      wrapper.setAttribute(key, wrapperAttributes[key]);
    }
  }
  if (inner instanceof Array) {
    const fragment = document.createDocumentFragment();
    inner.forEach((element) => fragment.appendChild(element));
    wrapper.appendChild(fragment);
  } else {
    wrapper.innerHTML = inner.trim();
  }
  return wrapper;
};

export const changeScreen = (mainElement, element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element);
};
