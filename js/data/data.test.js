import {assert} from 'chai';
import {getScore, reduceLives, changeLevel, changeTime, fixStepResult} from './data.js';

const game = {
  playerName: ``,
  level: 0,
  lives: 2,
  answers: [],
  currentStepTime: 30
};

describe(`Game functions`, () => {
  describe(`Score`, () => {
    it(`Valid`, () => {
      assert.equal(getScore([`normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`], 0), 1000);
      assert.equal(getScore([`normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`], 1), 1050);
      assert.equal(getScore([`fast`, `slow`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`], 1), 1050);
    });
    it(`Invalid`, () => {
      assert.equal(getScore([], 0), -1);
      assert.equal(getScore([`normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`], 1), -1);
      assert.equal(getScore([`normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`], 10), -1);
      assert.equal(getScore([`normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`], -1), -1);
    });
    it(`Incorrect`, () => {
      assert.equal(getScore({}, 0), -1);
      assert.equal(getScore(`1234567890`, 0), -1);
      assert.equal(getScore([`normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`], ``), -1);
    });
  });

  describe(`Lives`, () => {
    it(`Valid`, () => {
      assert.equal(reduceLives(2), 1);
      assert.equal(reduceLives(1), 0);
    });
    it(`Invalid`, () => {
      assert.equal(reduceLives(3), -1);
      assert.equal(reduceLives(0), -1);
    });
    it(`Incorrect`, () => {
      assert.equal(reduceLives(`2`), -1);
      assert.equal(reduceLives(``), -1);
      assert.equal(reduceLives([]), -1);
      assert.equal(reduceLives({}), -1);
    });
  });

  describe(`Level`, () => {
    it(`Valid`, () => {
      assert.equal(changeLevel(game, 0).level, 0);
      assert.equal(changeLevel(game, 2).level, 2);
      assert.equal(changeLevel(game, 4).level, 4);
    });
    it(`Invalid`, () => {
      assert.equal(changeLevel(game, -1).level, -1);
      assert.equal(changeLevel(game, 5).level, -1);
      assert.equal(changeLevel(game, Infinity).level, -1);
    });
    it(`Incorrect`, () => {
      assert.equal(changeLevel(game, ``).level, -1);
      assert.equal(changeLevel(game, `a`).level, -1);
      assert.equal(changeLevel(game, []).level, -1);
    });
  });

  describe(`Time tick`, () => {
    it(`Reduce current Time`, () => {
      assert.equal(changeTime(game).currentStepTime, game.currentStepTime + 1);
    });
  });

  describe(`Time tick`, () => {
    it(`Fixing current step result`, () => {
      assert.equal(fixStepResult(game).currentStepTime, 0);
    });
  });

});
