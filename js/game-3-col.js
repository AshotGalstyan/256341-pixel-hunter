import {debug, LAYOUTS} from './data/data.js';
import {IMAGES} from './data/game-data.js';
import {createImage} from './utilites.js';

export const show3Col = (layout, images) => {

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

  const image3 = {
    width: IMAGES.get(images[2]).width,
    height: IMAGES.get(images[2]).height
  };

  const template = `
  <p class="game__task">${LAYOUTS.get(layout).title}</p>
  <form class="game__content game__content--triple">
    <div class="game__option">
      <label>
        ${createImage(images[0], `Option 1`, (debug ? IMAGES.get(images[0]).type : ``), place, image1)}
        <input class="visually-hidden" name="question1" type="radio" value="${images[0]}">
      </label>
    </div>
    <div class="game__option">
      <label>
        ${createImage(images[1], `Option 2`, (debug ? IMAGES.get(images[1]).type : ``), place, image2)}
        <input class="visually-hidden" name="question1" type="radio" value="${images[1]}">
      </label>
    </div>
    <div class="game__option">
      <label>
        ${createImage(images[2], `Option 3`, (debug ? IMAGES.get(images[2]).type : ``), place, image3)}
        <input class="visually-hidden" name="question1" type="radio" value="${images[2]}">
      </label>
    </div>
  </form>
  `;

  return template;

};
