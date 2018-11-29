import {showCurrentState, changeScreen, render} from './utilites.js';
import {showHeader} from './header.js';
import {handleBackButton} from './back-button.js';
import {ANSWER_TO_POINT_MAP, LIVES_TO_POINT, TOTAL_STEPS} from './data/data.js';
import {ARCHIVE} from './data/game-data.js';

const getScore = (answers, lives) => {

  const score = answers.reduce((acc, answer) => {
    acc[answer] = (acc[answer] || 0) + 1;
    return acc;
  }, {});

  for (const key in ANSWER_TO_POINT_MAP) {
    if (!score.hasOwnProperty(key)) {
      score[key] = 0;
    }
  }

  let total = 0;
  for (const key in score) {
    if (score.hasOwnProperty(key)) {
      total += score[key] * ANSWER_TO_POINT_MAP[key];
    }
  }
  score.total = total + lives * LIVES_TO_POINT;
  score.lives = lives;

  return score;

};

const showCurrentScore = (currNumber, answers, lives) => {

  const currentScore = getScore(answers, lives);

  let template = `
  <table class="result__table">
        <tr>
          <td class="result__number">${currNumber}.</td>
          <td colspan="2">`;

  template += `<ul class="stats">` + showCurrentState(answers, answers.length) + `</ul>`;

  template += `
        </td>`;

  if (answers.length < TOTAL_STEPS) {

    template += `
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>
      </tr>
    </table>
    `;

  } else {

    template += `
          <td class="result__points">× 100</td>
          <td class="result__total">${(currentScore.correct + currentScore.fast + currentScore.slow) * ANSWER_TO_POINT_MAP.correct}</td>
        </tr>`;

    if (currentScore.fast > 0) {
      template += `
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${currentScore.fast} <span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">${currentScore.fast * (ANSWER_TO_POINT_MAP.fast - ANSWER_TO_POINT_MAP.correct)}</td>
      </tr>
      `;
    }

    if (currentScore.lives > 0) {
      template += `
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${currentScore.lives} <span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">${(currentScore.lives * LIVES_TO_POINT)}</td>
      </tr>
      `;
    }

    if (currentScore.slow > 0) {
      template += `
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${currentScore.slow} <span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">${currentScore.slow * (ANSWER_TO_POINT_MAP.slow - ANSWER_TO_POINT_MAP.correct)}</td>
      </tr>
      `;
    }

    template += `
      <tr>
        <td colspan="5" class="result__total  result__total--final">${currentScore.total}</td>
      </tr>
    </table>`;
  }

  return template;

};

export const showStats = (game, backButtonRender) => {

  let template = `${showHeader()}
  <section class="result">
    <h2 class="result__title">${game.answers.length < TOTAL_STEPS ? `Поражение` : `Победа!`}</h2>
    ${showCurrentScore(1, game.answers, game.lives)}`;

  for (let i = 0; i < ARCHIVE.length; i++) {
    template += showCurrentScore(i + 2, ARCHIVE[i].answers, ARCHIVE[i].lives);
  }

  template += `
  </section>
  `;

  const element = render(template);

  handleBackButton(element, backButtonRender);

  changeScreen(element);

};
