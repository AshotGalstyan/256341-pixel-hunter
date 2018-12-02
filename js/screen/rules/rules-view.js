import AbstractView from '../../abstract-view.js';

export default class RulesView extends AbstractView {
  get template() {
    return `
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
          <input class="rules__input" type="text" placeholder="Ваше Имя">
          <button class="rules__button  continue" type="submit" disabled>Go!</button>
        </form>
      </section>
      `;
  }

  bind() {
    this.nextButton = this.element.querySelector(`.rules__button`);
    this.nextButton.addEventListener(`click`, this.onClick);

    this.name = this.element.querySelector(`.rules__input`);
    this.name.addEventListener(`keyup`, this.onInputName);
  }

  unbind() {
    this.nextButton.removeEventListener(`click`, this.onClick);
    this.name.removeEventListener(`keyup`, this.onInputName);
  }

  onClick() {}
  onInputName() {}
}