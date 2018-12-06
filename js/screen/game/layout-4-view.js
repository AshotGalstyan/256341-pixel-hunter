import Design3View from './design/columns-3-view.js';
import {IMAGES} from '../../data/data.js';
import {IMAGE_TYPES} from '../../common/constants.js';
import {selectImagesPhotoPaint, getTrueAnswer} from '../../common/utilites.js';

export default class Layout4View extends Design3View {

  constructor(statistics) {

    super();

    this.title = `Найдите фото среди изображений`;
    this.images = selectImagesPhotoPaint([...IMAGES.keys()], 1, 2);
    this.trueAnswer = getTrueAnswer(this.images, IMAGE_TYPES.photo);
    this.statistics = statistics;
  }
}
