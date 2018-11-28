import {debug, LAYOUTS} from './data/data.js';
import {IMAGES} from './data/game-data.js';

export const show1Col = (layout, images) => {

  const template = `
  <p class="game__task">${LAYOUTS.get(layout).title}</p>
  <form class="game__content game__content--wide">
    <div class="game__option">
      <img src="${images[0]}" alt="Option" width="705" height="455" ${(debug ? `title="` + IMAGES.get(images[0]).type + `"` : ``)}>
      <label class="game__answer  game__answer--photo">
        <input class="visually-hidden" name="question1" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--paint">
        <input class="visually-hidden" name="question1" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>
  </form>
  `;

  return template;

};
