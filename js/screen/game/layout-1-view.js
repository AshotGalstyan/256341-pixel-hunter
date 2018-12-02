import AbstractView from '../../abstract-view.js';
import {debug, MAX_TIME_LIMIT, QUIZ_RESULTS} from '../../constants.js';
import {createImage, selectImages, rankingAnswer} from '../../utilites.js';
import {IMAGES} from '../../data/game-data.js';

const getTrueAnswers = (images) => {
  return IMAGES.get(images[0]).type;
};

export default class Layout1View extends AbstractView {

  constructor(statistics) {
    super();
    this.title = `Угадай, фото или рисунок?`;
    this.images = selectImages([...IMAGES.keys()]);
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

  get result() {

    if (this.answerTime > MAX_TIME_LIMIT) {
      return QUIZ_RESULTS.dead.type;
    }
    const selectedType = this.element.querySelector(`input[type="radio"]:checked`).value;
    if (selectedType !== this.trueAnswers) {
      return QUIZ_RESULTS.wrong.type;
    }
    return rankingAnswer(this.answerTime);
  }

  bind() {
    this._controls = this.element.querySelectorAll(`input[type="radio"]`);
    this._controls.forEach((control) => {
      control.addEventListener(`click`, this.onFinishQuest);
    });
  }

  unbind() {
    this._controls.forEach((control) => {
      control.removeEventListener(`click`, this.onFinishQuest);
    });
  }

  onFinishQuest() {}

}
