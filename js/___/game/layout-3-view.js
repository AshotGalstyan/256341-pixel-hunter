import Design3View from './design/columns-3-view.js';
import {IMAGES} from '../../data/game-data.js';
import {IMAGE_TYPES} from '../../constants.js';
import {selectImagesPhotoPaint, getTrueAnswer} from '../../utilites.js';

export default class Layout3View extends Design3View {

  constructor(statistics) {

    super();

    this.title = `Найдите рисунок среди изображений`;
    this.images = selectImagesPhotoPaint([...IMAGES.keys()], 2, 1);
    this.trueAnswer = getTrueAnswer(this.images, IMAGE_TYPES.paint);
    this.statistics = statistics;
  }
}
