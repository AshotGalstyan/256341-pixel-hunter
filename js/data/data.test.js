import {assert} from 'chai';
import {getScore, reduceLives, changeLevel, timeControl, fixStepResult} from './data.js';

let game = {
  playerName: ``,
  level: 0,
  lives: 2,
  answers: [],
  currentStepTime: 30
};

describe(`Game functions`, () => {
  describe(`Score`, () => {
    it(`Normal Score`, () => {
      assert.equal(getScore([`normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`], 0), 1000);
    });
  });

  describe(`Lives`, () => {
    it(`Reduce Lives`, () => {
      assert.equal(reduceLives(game.lives), 1);
    });
  });

  describe(`Level`, () => {
    it(`Set Game level`, () => {
      assert.equal(changeLevel(game, 4), 4);
    });
  });

  describe(`Time tick`, () => {
    it(`Reduce current Time`, () => {
      assert.equal(timeControl(game).currentStepTime, game.currentStepTime + 1);
    });
  });

  describe(`Time tick`, () => {
    it(`Fixing current step result`, () => {
      assert.equal(fixStepResult(game).currentStepTime, 0);
    });
  });

});
