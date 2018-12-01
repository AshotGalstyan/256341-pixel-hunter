import Layout1View from './layout-1-view.js';
import {selectRandom} from '../../../utilites.js';
import {IMAGES} from '../../../data/game-data.js';



export default () => {
  const intro = new IntroView();

};

const layout1 = (statistics) => {
  const layout = new Layout1View();
  layout.title = `Угадай, фото или рисунок?`;
  layout.images = selectRandom([...IMAGES.keys()]);
  layout.trueAnswers = getTrueAnswers(this.images);
  layout._place = {width: 705, height: 455};
  layout.statistics = statistics;

  layout.onClick = () => {
    layout.unbind();
    changeScreen(greeting());
  };

  return intro.element;

  result(realArswers, time) {
    return `correct`;
  }
}
