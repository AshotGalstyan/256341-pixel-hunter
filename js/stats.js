import {changeScreen, render, showCurrentState} from './utilites.js';
import logo from './logo.js';
import {showIntro} from './intro.js';
import {ANSWER_TO_POINT_MAP, LIVES_TO_POINT, TESTS_COUNT} from './data/data.js';
import {ARCHIVE} from './data/game-data.js';

const getScore = (answers, lives) => {
  let scoreBase = {
    wrong: 0,
    correct: 0,
    slow: 0,
    fast: 0
  };

  let score = {
    total: 0,
    correct: 0,
    slow: 0,
    fast: 0,
    lives: 0
  };

  answers.forEach((answer) => {
    scoreBase[answer] = scoreBase[answer] + 1;
  });

  score.total = answers.reduce((acc, answer) => acc + ANSWER_TO_POINT_MAP[answer], 0) + LIVES_TO_POINT * lives;
  score.correct = (answers.length - scoreBase.wrong) * ANSWER_TO_POINT_MAP.correct;
  score.slow = scoreBase.slow;
  score.fast = scoreBase.fast;
  score.lives = lives;

  return score;

};

const showCurrentScore = (currNumber, answers, lives) => {

  const currentScore = getScore(answers, lives);

  // document.querySelector(`#debug`).innerHTML = `answers: ` + answers.join(`,`) + ` | currentScore: ` + JSON.stringify(currentScore);

  let template = `
  <table class="result__table">
        <tr>
          <td class="result__number">${currNumber}.</td>
          <td colspan="2">`;

  template += `<ul class="stats">` + showCurrentState(answers, answers.length) + `</ul>`;

  template += `
        </td>`;

  if (answers.length < TESTS_COUNT) {

    template += `
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>
      </tr>
    </table>
    `;

  } else {

    template += `
          <td class="result__points">× 100</td>
          <td class="result__total">${currentScore.correct}</td>
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

export const showStats = (state) => {

  let template = `
  <header class="header">` + logo + `</header>
  <section class="result">
    <h2 class="result__title">Победа!</h2>` + showCurrentScore(1, state.answers, state.livesRemaining + 1);


  for (let i = 0; i < ARCHIVE.length; i++) {
    template += showCurrentScore(i + 2, ARCHIVE[i].answers, ARCHIVE[i].livesRemaining);
  }
  template += `
  </section>
  `;

  const element = render(template);

  const backButton = element.querySelector(`.back`);

  backButton.addEventListener(`click`, () => {
    showIntro();
  });

  changeScreen(element);

};
