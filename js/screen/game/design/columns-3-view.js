import AbstractView from '../../../common/abstract-view.js';
import {DEBUG, QUIZ_RESULTS} from '../../../common/constants.js';
import {createImage} from '../../../common/utilites.js';
import {IMAGES} from '../../../data/data.js';

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
          <div class="game__option"${(DEBUG ? ` data-type="&nbsp;` + IMAGES.get(this.images[0]).type + `&nbsp;"` : ``)}>
            <label>
              ${createImage(this.images[0], `Option 1`, this._place, {width: IMAGES.get(this.images[0]).width, height: IMAGES.get(this.images[0]).height})}
              <input class="visually-hidden" name="question" type="radio" value="${this.images[0]}">
            </label>
          </div>
          <div class="game__option"${(DEBUG ? ` data-type="&nbsp;` + IMAGES.get(this.images[1]).type + `&nbsp;"` : ``)}>
            <label>
              ${createImage(this.images[1], `Option 2`, this._place, {width: IMAGES.get(this.images[1]).width, height: IMAGES.get(this.images[1]).height})}
              <input class="visually-hidden" name="question" type="radio" value="${this.images[1]}">
            </label>
          </div>
          <div class="game__option"${(DEBUG ? ` data-type="&nbsp;` + IMAGES.get(this.images[2]).type + `&nbsp;"` : ``)}>
            <label>
              ${createImage(this.images[2], `Option 3`, this._place, {width: IMAGES.get(this.images[2]).width, height: IMAGES.get(this.images[2]).height})}
              <input class="visually-hidden" name="question" type="radio" value="${this.images[2]}">
            </label>
          </div>
        </form>
        <ul class="stats">${this.statistics}</ul>
      </section>
      `;
  }

  get result() {
    const selectedImage = this.element.querySelector(`input[type="radio"]:checked`).value;
    if (selectedImage !== this.trueAnswer) {
      return QUIZ_RESULTS.wrong.type;
    }
    return QUIZ_RESULTS.correct.type;
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
