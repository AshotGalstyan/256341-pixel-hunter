import AbstractView from '../../abstract-view.js';
import {statsLine} from '../../utilites.js';
import {ARCHIVE} from '../../data/game-data.js';
import {TOTAL_STEPS, LIVES_TO_POINT, QUIZ_RESULTS} from '../../constants.js';

const getScore = (answers, lives) => {

  const score = answers.reduce((acc, answer) => {
    acc[answer] = (acc[answer] || 0) + 1;
    return acc;
  }, {});

  for (const key in QUIZ_RESULTS) {
    if (key !== QUIZ_RESULTS.incompleate.type && !score.hasOwnProperty(key)) {
      score[key] = 0;
    }
  }

  let total = 0;
  for (const key in score) {
    if (score.hasOwnProperty(key)) {
      total += score[key] * QUIZ_RESULTS[key].points;
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

  template += `<ul class="stats">` + statsLine(answers) + `</ul>`;

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
          <td class="result__total">${(currentScore.correct + currentScore.fast + currentScore.slow) * QUIZ_RESULTS.correct.points}</td>
        </tr>`;

    if (currentScore.fast > 0) {
      template += `
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${currentScore.fast} <span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">${currentScore.fast * (QUIZ_RESULTS.fast.points - QUIZ_RESULTS.correct.points)}</td>
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
        <td class="result__total">${currentScore.slow * (QUIZ_RESULTS.slow.points - QUIZ_RESULTS.correct.points)}</td>
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


const getStatistics = (answers, lives, archive) => {

  let template = showCurrentScore(1, answers, lives);

  for (let i = 0; i < archive.length; i++) {
    template += showCurrentScore(i + 2, archive[i].answers, archive[i].lives);
  }

  return template;

};


export default class Layout1View extends AbstractView {

  constructor(name, answers, lives) {
    super();
    this.name = name;
    this.title = (answers.length < TOTAL_STEPS ? `Поражение` : `Победа!`);
    this.statistics = getStatistics(answers, lives, ARCHIVE);
    this.lives = lives;
  }
  get template() {
    return `
      <section class="result">
        <h2 class="result__title">${this.title}</h2>
        ${this.statistics}
      </section>
      `;
  }
}
