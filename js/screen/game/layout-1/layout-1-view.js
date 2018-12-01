import AbstractView from '../../../abstract-view.js';
import {debug} from '../../../constants.js';
import {createImage, randomElement} from '../../../utilites.js';
import {IMAGES} from '../../../data/game-data.js';

const getTrueAnswers = (images) => {
  return IMAGES.get(images[0]).type;
};

export default class Layout1View extends AbstractView {

  constructor(statistics) {
    super();
    this.title = `Угадай, фото или рисунок?`;
    this.images = randomElement([...IMAGES.keys()]);
    this.trueAnswers = getTrueAnswers(this.images);
    this._place = {width: 705, height: 455};
    this.statistics = statistics;
  }

  get template() {
    return `
      <section class="game">
        <p class="game__task">${this.title}</p>
        <form class="game__content  game__content--wide">
          <div class="game__option">
          ${createImage(this.images[0], `Option`, (debug ? IMAGES.get(this.images[0]).type : ``), this._place, {width: IMAGES.get(this.images[0]).width, height: IMAGES.get(this.images[0]).height})}
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
        <ul class="stats">${this.statistics}</ul>
      </section>
      `;
  }

  bind() {
    this.nextAction = this.element.querySelector(`.game__content input[type="radio"]`);
    this.nextAction.addEventListener(`click`, this.onClick);
  }

  unbind() {
    this.nextAction.removeEventListener(`click`, this.onClick);
  }

  onClick() {}
}
