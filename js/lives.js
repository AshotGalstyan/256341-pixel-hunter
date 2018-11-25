export const renderLives = (currentLives, totalLives) => {

  let out = ``;

  for (let i = 0; i < totalLives - currentLives - 1; i++) {
    out += `<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`;
  }

  for (let i = 0; i <= currentLives; i++) {
    out += `<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`;
  }
  return out;
};
