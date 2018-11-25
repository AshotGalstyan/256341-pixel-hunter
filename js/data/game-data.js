export const PIXEL_HUNTER = [
  {
    case: 1,
    title: `Угадайте для каждого изображения фото или рисунок?`,
    images: [{img: `http://placehold.it/468x458`, type: `photo`}, {img: `http://placehold.it/468x458`, type: `paint`}],
    answers: [`photo`, `paint`]
  },
  {
    case: 2,
    title: `Угадай, фото или рисунок?`,
    images: [{img: `http://placehold.it/705x455`, type: `photo`}],
    answers: [`photo`]
  },
  {
    case: 3,
    title: `Найдите фото среди изображений`,
    images: [{img: `http://placehold.it/304x455`, type: `photo`}, {img: `http://placehold.it/304x455`, type: `paint`}, {img: `http://placehold.it/304x455`, type: `paint`}],
    answers: [`0`]
  },
  {
    case: 3,
    title: `Найдите рисунок среди изображений`,
    images: [{img: `http://placehold.it/304x455`, type: `photo`}, {img: `http://placehold.it/304x455`, type: `paint`}, {img: `http://placehold.it/304x455`, type: `photo`}],
    answers: [`1`]
  },
  {
    case: 1,
    title: `Угадайте для каждого изображения фото или рисунок?`,
    images: [{img: `http://placehold.it/468x458`, type: `photo`}, {img: `http://placehold.it/468x458`, type: `photo`}],
    answers: [`photo`, `photo`]
  },
  {
    case: 2,
    title: `Угадай, фото или рисунок?`,
    images: [{img: `http://placehold.it/705x455`, type: `paint`}],
    answers: [`paint`]
  },
  {
    case: 1,
    title: `Угадайте для каждого изображения фото или рисунок?`,
    images: [{img: `http://placehold.it/468x458`, type: `photo`}, {img: `http://placehold.it/468x458`, type: `paint`}],
    answers: [`photo`, `paint`]
  },
  {
    case: 3,
    title: `Найдите фото среди изображений`,
    images: [{img: `http://placehold.it/304x455`, type: `photo`}, {img: `http://placehold.it/304x455`, type: `paint`}, {img: `http://placehold.it/304x455`, type: `paint`}],
    answers: [`0`]
  },
  {
    case: 2,
    title: `Угадай, фото или рисунок?`,
    images: [{img: `http://placehold.it/705x455`, type: `photo`}],
    answers: [`photo`]
  },
  {
    case: 3,
    title: `Найдите рисунок среди изображений`,
    images: [{img: `http://placehold.it/304x455`, type: `photo`}, {img: `http://placehold.it/304x455`, type: `photo`}, {img: `http://placehold.it/304x455`, type: `paint`}],
    answers: [`2`]
  }
];

export const ARCHIVE = [
  {
    livesRemaining: 1,
    answers: [`wrong`, `slow`, `wrong`, `slow`, `correct`, `slow`, `wrong`]
  },
  {
    livesRemaining: 2,
    answers: [`slow`, `correct`, `correct`, `slow`, `wrong`, `wrong`, `correct`, `wrong`, `correct`, `wrong`]
  },
  {
    livesRemaining: 0,
    answers: [`fast`, `wrong`, `slow`, `wrong`, `slow`, `correct`, `slow`, `wrong`, `fast`, `slow`]
  }
];
