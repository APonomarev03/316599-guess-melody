'use strict';

const RIGHT_ARROW = 37;
const LEFT_ARROW = 39;
const LEFT_BTN_CLASS = `left-btn`;
const screens = Array.from(document.querySelectorAll(`template`)).map((screen) => screen.content);
const mainContainer = document.querySelector(`section.main`);
const appContainer = document.querySelector(`.app`);
let currentIndex = 0;
appContainer.insertAdjacentHTML(`beforeEnd`, `
<div class="arrows__wrap">
    <style>
      .arrows__wrap {
        position: absolute;
        top: 135px;
        left: 50%;
        margin-left: -56px;
      }
      .arrows__btn {
        background: none;
        border: 2px solid black;
        padding: 5px 20px;
      }
    </style>
    <button class="arrows__btn left-btn"><-</button>
    <button class="arrows__btn right-btn">-></button>
</div>
`);

const showScreen = (screen) => {
  mainContainer.innerHTML = ``;
  mainContainer.appendChild(screen.cloneNode(true));
};

const selectScreen = (index) => {
  index = index < 0 ? screens.length - 1 : index;
  index = index >= screens.length ? 0 : index;
  currentIndex = index;
  showScreen(screens[currentIndex]);
};

document.addEventListener(`keydown`, (evt) => {
  switch (evt.keyCode) {
    case RIGHT_ARROW:
      selectScreen(currentIndex + 1);
      break;
    case LEFT_ARROW:
      selectScreen(currentIndex - 1);
      break;
  }
});

document.addEventListener(`click`, (evt) => {
  const element = evt.target;
  if (element.classList.contains(LEFT_BTN_CLASS)) {
    selectScreen(currentIndex - 1);
  } else {
    selectScreen(currentIndex + 1);
  }
});

selectScreen(0);
