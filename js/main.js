'use strict';

const ARROW_LEFT = 37;
const ARROW_RIGHT = 39;

const controlBlock = `
<div class="arrows__wrap">
  <style>
    .arrows__wrap {
      position: absolute;
      top: 95px;
      left: 50%;
      margin-left: -56px;
      z-index: 10;
    }
    .arrows__btn {
      background: none;
      border: 2px solid black;
      padding: 5px 20px;
    }
  </style>
  <button class="arrows__btn"><-</button>
  <button class="arrows__btn">-></button>
</div>`;

const mainElement = document.querySelector(`#main`);

const selectSlide = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(wrap(element));
};

const wrap = (it) => {
  const shadow = document.createElement(`div`);
  const content = it.cloneNode(true);
  shadow.appendChild(content);
  return shadow.cloneNode(true);
};

const screens = Array.from(document.querySelectorAll(`template`)).
  map((it) => it.content);

let current = 0;
const select = (index) => {
  index = index < 0 ? screens.length - 1 : index;
  index = index >= screens.length ? 0 : index;
  current = index;
  selectSlide(screens[current]);
};

document.querySelector(`body`).insertAdjacentHTML(`beforeend`, controlBlock);

const controlBtnLeft = document.querySelectorAll(`.arrows__wrap .arrows__btn`)[0];
const controlBtnRight = document.querySelectorAll(`.arrows__wrap .arrows__btn`)[1];

document.addEventListener(`keydown`, (evt) => {
  switch (evt.keyCode) {
    case ARROW_RIGHT:
      select(current + 1);
      break;
    case ARROW_LEFT:
      select(current - 1);
      break;
  }
});

controlBtnLeft.addEventListener(`click`, () => {
  select(current - 1);
});

controlBtnRight.addEventListener(`click`, () => {
  select(current + 1);
});

select(0);
