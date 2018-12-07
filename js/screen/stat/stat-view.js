import AbstractView from '../../common/abstract-view.js';
import {statsLine} from '../../common/utilites.js';
import {TOTAL_STEPS, LIVES_TO_POINT, QUIZ_RESULTS, STAT_INFO, TOTAL_TITLE_FOR_FAILED} from '../../common/constants.js';
import {ARCHIVE} from '../../data/data.js';

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

  const statBody = (answers.length < TOTAL_STEPS ?
    (`
      <tr>
        <td class="result__number">${currNumber}</td>
        <td colspan="2"><ul class="stats">${statsLine(answers)}</ul></td>
        <td class="result__points"></td>
        <td class="result__total  result__total--final">${TOTAL_TITLE_FOR_FAILED}</td>
      </tr>
      `) :
    (
      Object.keys(STAT_INFO).map((key) => {
        if (key === `correct`) {
          return `
          <tr>
            <td class="result__number">${currNumber}.</td>
            <td colspan="2"><ul class="stats">${statsLine(answers)}</ul></td>
            <td class="result__points">× ${STAT_INFO[key].bonus}</td>
            <td class="result__total">${(currentScore[key] + currentScore[QUIZ_RESULTS.fast.type] + currentScore[QUIZ_RESULTS.slow.type]) * STAT_INFO[key].bonus}</td>
          </tr>
          `;
        } else if (key !== `total`) {
          return (currentScore[key] > 0 ?
            `
            <tr>
            <td></td>
              <td class="result__extra">${STAT_INFO[key].title}</td>
              <td class="result__extra">${currentScore[key]} <span class="stats__result stats__result--${key}"></span></td>
              <td class="result__points">× ${Math.abs(STAT_INFO[key].bonus)}</td>
              <td class="result__total">${currentScore[key] * STAT_INFO[key].bonus}</td>
            </tr>
            ` : ``
          );
        }
        return `
          <tr><td colspan="5" class="result__total  result__total--final">${currentScore[key]}</td></tr>
          `;
      }).join(``)
    )
  );

  return `<table class="result__table"><tr>${statBody}</tr></table>`;

};

const getStatistics = (answers, lives, archive) => {

  let template = showCurrentScore(1, answers, lives);

  for (let i = 0; i < archive.length; i++) {
    template += showCurrentScore(i + 2, archive[i].answers, archive[i].lives);
  }

  return template;

};

export default class StatView extends AbstractView {

  constructor(answers, lives) {

    super();

    this.title = (answers.length < TOTAL_STEPS ? `Поражение` : `Победа!`);
    this.statistics = getStatistics(answers, lives, ARCHIVE);
    this.lives = lives;
  }

  get wrapperTag() {
    return `section`;
  }
  get wrapperAttributes() {
    return {class: `result`};
  }

  get template() {
    return `
      <h2 class="result__title">${this.title}</h2>
      ${this.statistics}
      `;
  }
}
