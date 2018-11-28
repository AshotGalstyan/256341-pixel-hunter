import {debug, LAYOUTS} from './data/data.js';
import {IMAGES} from './data/game-data.js';

export const show3Col = (layout, images) => {

  const template = `
  <p class="game__task">${LAYOUTS.get(layout).title}</p>
  <form class="game__content game__content--triple">
    <div class="game__option">
      <label>
        <img src="${images[0]}" alt="Option 1" width="304" height="455" ${(debug ? `title="` + IMAGES.get(images[0]).type + `"` : ``)}>
        <input class="visually-hidden" name="question1" type="radio" value="${images[0]}">
      </label>
    </div>
    <div class="game__option">
      <label>
        <img src="${images[1]}" alt="Option 2" width="304" height="455" ${(debug ? `title="` + IMAGES.get(images[1]).type + `"` : ``)}>
        <input class="visually-hidden" name="question1" type="radio" value="${images[1]}">
      </label>
    </div>
    <div class="game__option">
      <label>
        <img src="${images[2]}" alt="Option 3" width="304" height="455" ${(debug ? `title="` + IMAGES.get(images[2]).type + `"` : ``)}>
        <input class="visually-hidden" name="question1" type="radio" value="${images[2]}">
      </label>
    </div>
  </form>
  `;

  return template;

};
