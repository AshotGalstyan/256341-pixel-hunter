import {changeScreen, render} from './utilites.js';
import {showGreeting} from './greeting.js';

const template = `
<section class="intro">
  <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
  <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
</section>
`;

const element = render(template);

const nextButton = element.querySelector(`.intro__asterisk`);

nextButton.addEventListener(`click`, () => {
  showGreeting();
});

export const showIntro = () => {
  changeScreen(element);
};
