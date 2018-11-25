import {changeScreen, render} from './utilites.js';
import {showIntro} from './intro.js';
import logo from './logo.js';
import {showGame} from './game.js';
import {showStats} from './stats.js';

const template = `
<header class="header">` + logo + `</header>
<section class="rules">
  <h2 class="rules__title">Правила</h2>
  <ul class="rules__description">
    <li>Угадай 10 раз для каждого изображения фото
      <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
      <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
    <li>Фотографиями или рисунками могут быть оба изображения.</li>
    <li>На каждую попытку отводится 30 секунд.</li>
    <li>Ошибиться можно не более 3 раз.</li>
  </ul>
  <p class="rules__ready">Готовы?</p>
  <form class="rules__form">
    <input class="rules__input" type="text" placeholder="Ваше Имя" value="">
    <button class="rules__button  continue" type="submit" disabled>Go!</button>
  </form>
</section>
`;

const element = render(template);

const backButton = element.querySelector(`.back`);

backButton.addEventListener(`click`, () => {
  showIntro();
});

const name = element.querySelector(`.rules__input`);

name.addEventListener(`keyup`, () => {

  if (name.value.trim() !== ``) {
    nextButton.disabled = false;
  } else {
    name.value = ``;
    nextButton.disabled = true;
  }
});

const nextButton = element.querySelector(`.rules__button`);

nextButton.addEventListener(`click`, () => {
  name.value = name.value.trim();
  showGame();
});

export const showRules = () => {
  changeScreen(element);
};
