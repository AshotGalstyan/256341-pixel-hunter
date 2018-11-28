import {MAX_LIVES} from './data/data.js';

export const showHeader = (timer, lives) => {
  const backButtonTemplate = `
  <button class="back">
    <span class="visually-hidden">Вернуться к началу</span>
    <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
      <use xlink:href="img/sprite.svg#arrow-left"></use>
    </svg>
    <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
      <use xlink:href="img/sprite.svg#logo-small"></use>
    </svg>
  </button>
  `;


  const timerTemplate = (timer >= 0 ? `<div class="game__timer">${timer}</div>` : ``);
  const getLivesTemplate = () => {
    if (lives >= 0) {
      const emptyHeart = `<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`;
      const fullHeart = `<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`;

      return `
        <div class="game__lives">
          ${new Array(MAX_LIVES - lives).fill(emptyHeart).join(``)}
          ${new Array(lives).fill(fullHeart).join(``)}
        </div>
      `;
    }
    return ``;
  };

  return `
    <header class="header">
      ${backButtonTemplate}
      ${timerTemplate}
      ${getLivesTemplate()}
    </header>
  `;
};
