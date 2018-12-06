import {MAX_LIVES, TOTAL_STEPS} from "../common/constants.js";

export default class GameModel {

  constructor(playerName) {
    this.playerName = playerName;
    this.step = 0;
    this.lives = MAX_LIVES;
    this.answers = [];
    this.gameOver = false;
  }

  getCurrentStep() {
    return this.step;
  }

  getCurrentLives() {
    return this.lives;
  }

  getAnswers() {
    return this.answers;
  }

  nextStep() {
    if (this.step < TOTAL_STEPS - 1) {
      this.step += 1;
    } else {
      this.step = -1;
      this.gameOver = true;
    }
  }

  die() {
    if (this.lives > 0) {
      this.lives -= 1;
    } else {
      this.lives = -1;
      this.gameOver = true;
    }
  }

  addAnswer(answer) {
    this.answers.push(answer);
    this.nextStep();
  }

  canContinue() {
    return !this.gameOver;
  }
}