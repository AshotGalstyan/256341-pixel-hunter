import {assert} from 'chai';
import {reduceLives, changeLevel, changeTime, fixStepResult} from './data.js';

const game = {
  level: 0,
  lives: 2,
  answers: [],
  currentStepTime: 30
};

describe(`Game functions`, () => {

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
