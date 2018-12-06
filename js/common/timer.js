class Timer {
  constructor(time) {
    this.time = this.startTime = time;
  }

  tick() {
    if (!this.time) {
      return `finished`;
    }

    this.time--;

    return this.time || `finished`;
  }

  reset() {
    this.time = this.startTime;
  }

  getTime() {
    return this.time;
  }
}

export default Timer;
