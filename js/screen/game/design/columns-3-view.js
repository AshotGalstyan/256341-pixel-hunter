import AbstractView from '../../../abstract-view.js';
import {debug, MAX_TIME_LIMIT, QUIZ_RESULTS} from '../../../constants.js';
import {createImage, rankingAnswer} from '../../../utilites.js';
import {IMAGES} from '../../../data/game-data.js';

export default class Design3View extends AbstractView {

  constructor(statistics, title, images, trueAnswer) {

    super();

    this.title = title;
    this.images = images;
    this.trueAnswer = trueAnswer;
    this._place = {width: 304, height: 455};
    this.statistics = statistics;
  }

  get template() {
    return `
      <section class="game">
        <p class="game__task">${this.title}</p>
        <form class="game__content  game__content--triple">
          <div class="game__option">
            <label>
              ${createImage(this.images[0], `Option 1`, (debug ? IMAGES.get(this.images[0]).type : ``), this._place, {width: IMAGES.get(this.images[0]).width, height: IMAGES.get(this.images[0]).height})}
              <input class="visually-hidden" name="question" type="radio" value="${this.images[0]}">
            </label>
          </div>
          <div class="game__option  game__option--selected">
            <label>
              ${createImage(this.images[1], `Option 2`, (debug ? IMAGES.get(this.images[1]).type : ``), this._place, {width: IMAGES.get(this.images[1]).width, height: IMAGES.get(this.images[1]).height})}
              <input class="visually-hidden" name="question" type="radio" value="${this.images[1]}">
            </label>
          </div>
          <div class="game__option">
            <label>
              ${createImage(this.images[2], `Option 3`, (debug ? IMAGES.get(this.images[2]).type : ``), this._place, {width: IMAGES.get(this.images[2]).width, height: IMAGES.get(this.images[2]).height})}
              <input class="visually-hidden" name="question" type="radio" value="${this.images[2]}">
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
    const selectedImage = this.element.querySelector(`input[type="radio"]:checked`).value;
    if (selectedImage !== this.trueAnswer) {
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
