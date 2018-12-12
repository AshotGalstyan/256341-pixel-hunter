import AbstractView from '../../common/abstract-view.js';
import {getStatsLine} from '../../common/utilites.js';
import {MAX_LIVES, TOTAL_STEPS, LIVES_TO_POINT, QUIZ_RESULTS, STAT_INFO, TOTAL_TITLE_FOR_FAILED} from '../../common/constants.js';

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

  const total = Object.keys(score).reduce((sum, key) => sum + score[key] * QUIZ_RESULTS[key].points, 0);
  score.total = total + lives * LIVES_TO_POINT;
  score.lives = lives;

  return score;

};

const showCurrentScore = (currNumber, answers, lives, date) => {

  const currentScore = getScore(answers, lives);

  const gameDate = new Date(date).toLocaleDateString(`ru-RU`, {
    day: `numeric`,
    month: `short`,
    year: `numeric`,
    hour: `numeric`,
    minute: `numeric`,
    second: `numeric`
  });

  const statBody = (answers.length < TOTAL_STEPS ?
    (`
      <tr>
        <td class="result__number" title="${gameDate}">${currNumber}</td>
        <td colspan="2"><ul class="stats">${getStatsLine(answers)}</ul></td>
        <td class="result__points"></td>
        <td class="result__total  result__total--final">${TOTAL_TITLE_FOR_FAILED}</td>
      </tr>
      `) :
    (
      Object.keys(STAT_INFO).map((key) => {
        if (key === `correct`) {
          return `
          <tr>
            <td class="result__number" title="${gameDate}">${currNumber}.</td>
            <td colspan="2"><ul class="stats">${getStatsLine(answers)}</ul></td>
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

const getStatistics = (archive) => {

  return archive.reduce((temporary, current, index) => temporary + showCurrentScore(index + 1, current.answers, current.lives, current.date), ``);

};

const estimateGame = (answers) => {
  if (answers.length < TOTAL_STEPS) {
    return `Поражение`;
  }

  const totalWrongs = answers.filter((el) => el === QUIZ_RESULTS.wrong.type || el === QUIZ_RESULTS.dead.type);
  if (totalWrongs.length > MAX_LIVES) {
    return `Поражение`;
  }
  return `Победа!`;
};

export default class StatView extends AbstractView {

  constructor(archive) {

    super();

    this.title = estimateGame(archive[0].answers);
    this.statistics = getStatistics(archive);
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
