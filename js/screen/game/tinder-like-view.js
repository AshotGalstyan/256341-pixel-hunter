import AbstractView from '../../common/abstract-view.js';
import {DEBUG, QUIZ_RESULTS} from '../../common/constants.js';
import {createImage} from '../../common/utilites.js';

export default class TinderLike extends AbstractView {

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
        <form class="game__content  game__content--wide">
          <div class="game__option"${(DEBUG ? ` data-type="&nbsp;${this.allImages[this.images[0]].type}&nbsp;"` : ``)}>
          ${createImage(this.images[0], `Option`, this._place, this.allImages[this.images[0]].size)}
            <label class="game__answer  game__answer--photo">
              <input class="visually-hidden" name="question1" type="radio" value="photo">
              <span>Фото</span>
            </label>
            <label class="game__answer  game__answer--paint">
              <input class="visually-hidden" name="question1" type="radio" value="painting">
              <span>Рисунок</span>
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
