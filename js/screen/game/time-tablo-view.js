import AbstractView from '../../common/abstract-view.js';
import {MAX_TIME_LIMIT} from '../../common/constants.js';

export default class TimeTabloView extends AbstractView {
  constructor(time) {
    super();
    this.time = (time > MAX_TIME_LIMIT ? `<span style="color: #DE4D51;">` + time + `</style>` : `` + time);
  }

  get wrapperTag() {
    return `div`;
  }
  get wrapperAttributes() {
    return {class: `game__timer`};
  }
  get template() {
    return this.time;
  }
}
