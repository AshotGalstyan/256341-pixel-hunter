export const showLevel3 = (level) => {

  const template = `
  <form class="game__content  game__content--triple">
    <div class="game__option" data-number="0">
      <img src="${level.images[0].img + `?text=` + level.images[0].type}" alt="Option 1" width="304" height="455">
    </div>
    <div class="game__option" data-number="1">
      <img src="${level.images[1].img + `?text=` + level.images[1].type}" alt="Option 2" width="304" height="455">
    </div>
    <div class="game__option" data-number="2">
      <img src="${level.images[2].img + `?text=` + level.images[2].type}" alt="Option 3" width="304" height="455">
    </div>
  </form>
  `;

  return template;

};
