import {debug, LAYOUTS} from './data/data.js';
import {IMAGES} from './data/game-data.js';
import {makeImgTag} from './utilites.js';

export const show2Col = (layout, images) => {

  const place = {
    width: LAYOUTS.get(layout).width,
    height: LAYOUTS.get(layout).height
  };

  const image1 = {
    width: IMAGES.get(images[0]).width,
    height: IMAGES.get(images[0]).height
  };

  const image2 = {
    width: IMAGES.get(images[1]).width,
    height: IMAGES.get(images[1]).height
  };

  const template = `
  <p class="game__task">${LAYOUTS.get(layout).title}</p>
  <form class="game__content">
    <div class="game__option">
      ${makeImgTag(images[0], `Option 1`, (debug ? IMAGES.get(images[0]).type : ``), place, image1)}
      <label class="game__answer game__answer--photo">
        <input class="visually-hidden" name="question1" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
        <input class="visually-hidden" name="question1" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>
    <div class="game__option">
      ${makeImgTag(images[1], `Option 2`, (debug ? IMAGES.get(images[1]).type : ``), place, image2)}
      <label class="game__answer  game__answer--photo">
        <input class="visually-hidden" name="question2" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--paint">
        <input class="visually-hidden" name="question2" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>
  </form>
  `;

  return template;

};
