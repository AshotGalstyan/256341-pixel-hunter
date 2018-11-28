import {assert} from 'chai';
import {changeTime} from './data.js';

const game = {
  level: 0,
  lives: 2,
  answers: [],
  currentStepTime: 30
};

describe(`Game functions`, () => {

  describe(`Time tick`, () => {
    it(`Reduce current Time`, () => {
      assert.equal(changeTime(game).currentStepTime, game.currentStepTime + 1);
    });
  });

});
