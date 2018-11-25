export const showLevel2 = (level) => {

  const template = `
  <form class="game__content  game__content--wide">
    <div class="game__option">
      <img src="${level.images[0].img + `?text=` + level.images[0].type}" alt="Option 1" width="705" height="455">
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
  `;

  return template;

};
