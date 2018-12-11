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

  dialog() {
    return new Promise((resolve, reject) => {
      const yesButton = this.element.querySelector(`.modal__btn--yes`);
      const noButton = this.element.querySelector(`.modal__btn--no`);
      const closeButton = this.element.querySelector(`.modal__close`);

      noButton.addEventListener(`click`, function handleNoButtonClick(evt) {
        evt.preventDefault();
        noButton.removeEventListener(`click`, handleNoButtonClick);
        reject();
      });

      closeButton.addEventListener(`click`, function handleCloseButtonClick(evt) {
        evt.preventDefault();
        closeButton.removeEventListener(`click`, handleCloseButtonClick);
        reject();
      });

      yesButton.addEventListener(`click`, function handleYesButtonClick(evt) {
        evt.preventDefault();
        yesButton.removeEventListener(`click`, handleYesButtonClick);
        resolve();
      });
    });
  }
}
