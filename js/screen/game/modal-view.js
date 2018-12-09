import AbstractView from '../../common/abstract-view.js';

export default class ModalView extends AbstractView {
  get wrapperTag() {
    return `section`;
  }
  get wrapperAttributes() {
    return {class: `modal`};
  }
  get template() {
    return `
      <form class="modal__inner">
        <button class="modal__close" type="button">
          <span class="visually-hidden">Закрыть</span>
        </button>
        <h2 class="modal__title">Подтверждение</h2>
        <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
        <div class="modal__button-wrapper">
          <button class="modal__btn modal__btn--yes">Ок</button>
          <button class="modal__btn modal__btn--no">Отмена</button>
        </div>
      </form>
    `;
  }

  bind() {
    this.yesButton = this.element.querySelector(`.modal__btn--yes`);
    this.noButton = this.element.querySelector(`.modal__btn--no`);
    this.closeButton = this.element.querySelector(`.modal__close`);

    this.noButton.addEventListener(`click`, this.onCancel);
    this.closeButton.addEventListener(`click`, this.onCancel);
    this.yesButton.addEventListener(`click`, this.onOk);
  }

  unbind() {
    this.noButton.removeEventListener(`click`, this.onCancel);
    this.closeButton.removeEventListener(`click`, this.onCancel);
    this.yesButton.removeEventListener(`click`, this.onOk);
  }

  onOk() {}
  onCancel() {}

}
