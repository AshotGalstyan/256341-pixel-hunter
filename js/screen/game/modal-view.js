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
    const yesButton = this.element.querySelector(`.modal__btn--yes`);
    const noButton = this.element.querySelector(`.modal__btn--no`);
    const closeButton = this.element.querySelector(`.modal__close`);

    noButton.addEventListener(`click`, this.onCancel);
    closeButton.addEventListener(`click`, this.onCancel);
    yesButton.addEventListener(`click`, this.onOk);
  }

  onOk() {}
  onCancel() {}
}
