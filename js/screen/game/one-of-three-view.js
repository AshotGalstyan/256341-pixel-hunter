import AbstractView from '../../common/abstract-view.js';
import {DEBUG, QUIZ_RESULTS} from '../../common/constants.js';
import {createImage} from '../../common/utilites.js';

export default class OneOfThree extends AbstractView {

  constructor(step, images, statistics) {

    super();

    this.title = step.question;
    this.images = step.images;
    this.allImages = images;
    this.trueAnswers = step.answers;
    this._place = step.size;
    this.statistics = statistics;
  }

  get template() {
    return `
      <section class="game">
        <p class="game__task">${this.title}</p>
        <form class="game__content  game__content--triple">
          <div class="game__option"${(DEBUG ? ` data-type="&nbsp;${this.allImages.get(this.images[0]).type}&nbsp;"` : ``)}>
            <label>
              ${createImage(this.images[0], `Option 1`, this._place, this.allImages.get(this.images[0]).size)}
              <input class="visually-hidden" name="question" type="radio" value="${this.images[0]}">
            </label>
          </div>
          <div class="game__option"${(DEBUG ? ` data-type="&nbsp;${this.allImages.get(this.images[1]).type}&nbsp;"` : ``)}>
            <label>
              ${createImage(this.images[1], `Option 2`, this._place, this.allImages.get(this.images[1]).size)}
              <input class="visually-hidden" name="question" type="radio" value="${this.images[1]}">
            </label>
          </div>
          <div class="game__option"${(DEBUG ? ` data-type="&nbsp;${this.allImages.get(this.images[2]).type}&nbsp;"` : ``)}>
            <label>
              ${createImage(this.images[2], `Option 3`, this._place, this.allImages.get(this.images[2]).size)}
              <input class="visually-hidden" name="question" type="radio" value="${this.images[2]}">
            </label>
          </div>
        </form>
        <ul class="stats">${this.statistics}</ul>
      </section>
      `;
  }

  get result() {
    const selectedType = this.element.querySelector(`input[type="radio"]:checked`).value;
    if (selectedType !== this.trueAnswers[0]) {
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
