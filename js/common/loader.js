import {QuestionType, AnswerType, SERVER_URL, DEFAULT_NAME, APP_ID} from './constants.js';

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }
  throw new Error(`Произошла ошибка (код - ${response.status})`);
};

const convertToJSON = (res) => res.json();

const sortResults = (archive) => archive.sort((el1, el2) => el2.date - el1.date);

const getAnswersByType = (type, answers) => {

  if (type === QuestionType.TINDER_LIKE) {

    return [answers[0].type];

  } else if (type === QuestionType.ONE_OF_THREE) {

    const photos = answers.filter((el) => el.type === AnswerType.PHOTO);
    const paintings = answers.filter((el) => el.type === AnswerType.PAINTING);

    return (paintings.length === 1 ? [paintings[0].image.url] : [photos[0].image.url]);

  } else if (type === QuestionType.TWO_OF_TWO) {

    return [answers[0].type, answers[1].type];

  }
  throw new Error(`Произошла ошибка (некорректный тип вопроса)`);
};

const convertServerData = (serverData) => {

  const imagesMap = {};
  const screenplay = serverData.map((it) => {
    const type = it.type;
    const question = it.question;
    const size = {width: it.answers[0].image.width, height: it.answers[0].image.height};
    const images = it.answers.map((el) => {
      imagesMap[el.image.url] = {type: el.type};
      return el.image.url;
    });
    const answers = getAnswersByType(it.type, it.answers);

    return {type, question, size, images, answers};
  });

  return {screenplay, images: imagesMap};

};

const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener(`load`, () => resolve(image));
    image.addEventListener(`error`, () => reject(new Error(`Failed to load image's URL: ${url}`)));
    image.src = url;
  });
};

export default class Loader {
  static loadData() {
    return fetch(`${SERVER_URL}questions`)
      .then(checkStatus)
      .then((response) => response.json())
      .then((data) => {

        const temporary = convertServerData(data);

        this.images = temporary.images;
        this.screenplay = temporary.screenplay;

        return Object.keys(this.images);
      })
      .then((images) => images.map((it) => loadImage(it)))
      .then((imagePromises) => Promise.all(imagePromises))
      .then((images) => {

        images.forEach((it) => {
          this.images[it.src].size = {width: it.width, height: it.height};
        });

        return {screenplay: this.screenplay, images: this.images};
      });
  }

  static loadResults(name = DEFAULT_NAME) {
    return fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`).then(checkStatus).then(convertToJSON).then(sortResults);
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
