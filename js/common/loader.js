const SERVER_URL = `https://es.dump.academy/pixel-hunter/`;
const DEFAULT_NAME = `assa`;
const APP_ID = 6587322;

const QUESTION_TYPE = {
  TWO_OF_TWO: `two-of-two`,
  TINDER_LIKE: `tinder-like`,
  ONE_OF_THREE: `one-of-three`
};

const ANSWER_TYPE = {
  PAINTING: `painting`,
  PHOTO: `photo`
};

let gameSteps;
let imagesInfo;

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }
  throw new Error(`Произошла ошибка (код - ${response.status})`);
};

const toJSON = (res) => res.json();

const convertServerData = (serverData) => {
  const images = new Map();
  const screenplay = serverData.map((it) => {
    const step = {};
    step.type = it.type;
    step.question = it.question;
    step.size = {width: it.answers[0].image.width, height: it.answers[0].image.height};
    step.images = it.answers.map((el) => {
      const src = el.image.url;
      if (!images.has(src)) {
        images.set(src, {type: el.type, size: {width: 0, height: 0}});
      }
      return src;
    });

    switch (it.type) {
      case QUESTION_TYPE.TINDER_LIKE:
        step.answers = [it.answers[0].type];
        break;
      case QUESTION_TYPE.ONE_OF_THREE:
        const photos = it.answers.filter((el) => el.type === ANSWER_TYPE.PHOTO);
        const paintings = it.answers.filter((el) => el.type === ANSWER_TYPE.PAINTING);
        step.answers = (paintings.length === 1 ? [paintings[0].image.url] : [photos[0].image.url]);
        break;
      case QUESTION_TYPE.TWO_OF_TWO:
        step.answers = [it.answers[0].type, it.answers[1].type];
        break;
      default:
        throw new Error(`Произошла ошибка (некорректный тип вопроса)`);
    }
    return step;
  });

  return {images, screenplay};

};

const saveData = (data) => {

  gameSteps = data.screenplay;
  imagesInfo = data.images;

  return [...data.images.keys()];

};

const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener(`load`, () => resolve(image));
    image.addEventListener(`error`, () => reject(new Error(`Failed to load image's URL: ${url}`)));
    image.src = url;
  });
};

const fixImageSize = (images) => {
  images.forEach((it) => {

    const tmp = imagesInfo.get(it.src);
    tmp.size = {width: it.width, height: it.height};

    imagesInfo.set(it.src, tmp);
  });
};

const assembleData = () => {
  return {gameSteps, imagesInfo};
};

export default class Loader {
  static loadData() {
    return fetch(`${SERVER_URL}questions`)
      .then(checkStatus)
      .then((response) => response.json())
      .then(convertServerData)
      .then(saveData)
      .then((images) => images.map((it) => loadImage(it)))
      .then((imagePromises) => Promise.all(imagePromises))
      .then(fixImageSize)
      .then(assembleData);
  }

  static loadResults(name = DEFAULT_NAME) {
    return fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`).then(checkStatus).then(toJSON);
  }

  static saveResults(data, name = DEFAULT_NAME) {
    data = Object.assign({name}, data);
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`, requestSettings).then(checkStatus);
  }
}
