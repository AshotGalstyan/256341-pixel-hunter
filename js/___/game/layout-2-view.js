import AbstractView from '../../abstract-view.js';
import {debug, MAX_TIME_LIMIT, QUIZ_RESULTS} from '../../constants.js';
import {createImage, selectImages, rankingAnswer} from '../../utilites.js';
import {IMAGES} from '../../data/game-data.js';

const getTrueAnswers = (images) => {
  return [IMAGES.get(images[0]).type, IMAGES.get(images[1]).type];
};

export default class Layout2View extends AbstractView {

  constructor(statistics) {
    super();
    this.title = `Угадайте для каждого изображения фото или рисунок?`;
    this.images = selectImages([...IMAGES.keys()], 2);
    this.trueAnswers = getTrueAnswers(this.images);
    this._place = {width: 468, height: 458};
    this.statistics = statistics;
  }

  get template() {
    return `
      <section class="game">
        <p class="game__task">${this.title}</p>
        <form class="game__content">
          <div class="game__option"${(debug ? ` data-type="&nbsp;` + IMAGES.get(this.images[0]).type + `&nbsp;"` : ``)}>
            ${createImage(this.images[0], `Option 1`, this._place, {width: IMAGES.get(this.images[0]).width, height: IMAGES.get(this.images[0]).height})}
            <label class="game__answer game__answer--photo">
              <input class="visually-hidden" name="question1" type="radio" value="photo">
              <span>Фото</span>
            </label>
            <label class="game__answer game__answer--paint">
              <input class="visually-hidden" name="question1" type="radio" value="paint">
              <span>Рисунок</span>
            </label>
          </div>
          <div class="game__option"${(debug ? ` data-type="&nbsp;` + IMAGES.get(this.images[1]).type + `&nbsp;"` : ``)}>
            ${createImage(this.images[1], `Option 2`, this._place, {width: IMAGES.get(this.images[1]).width, height: IMAGES.get(this.images[1]).height})}
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
        <ul class="stats">${this.statistics}</ul>
      </section>
      `;
  }

  get result() {

    if (this.answerTime > MAX_TIME_LIMIT) {
      return QUIZ_RESULTS.dead.type;
    }

    const checkedControls = document.querySelectorAll(`input[type="radio"]:checked`);

    if (checkedControls.length !== this.trueAnswers.length) {
      return QUIZ_RESULTS.incompleate.type;
    }

    const levelAnswers = [...checkedControls].map((el) => el.value);

    if (levelAnswers[0] === this.trueAnswers[0] && levelAnswers[1] === this.trueAnswers[1]) {
      return rankingAnswer(this.answerTime);
    }

    return QUIZ_RESULTS.wrong.type;

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
