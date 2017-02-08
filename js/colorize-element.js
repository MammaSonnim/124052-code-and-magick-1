'use strict';

window.colorizeElement = function (element, colors, property) {
  /** @type {string} */
  var currentColor = colors[0];

  /** @const {number} */
  var ENTER_KEY_CODE = 13;

  /** @const {string} */
  var ARIA_CURRENT_VALUE_ATTRIBUTE = 'aria-valuenow';

  element.addEventListener('click', elementClickHandler);
  element.addEventListener('keydown', elementKeydownEnterHandler);

  function elementClickHandler(event) {
    setRandomColor();
  }

  function elementKeydownEnterHandler(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      setRandomColor();
    }
  }

  function setRandomColor() {
    currentColor = window.utils.getRandomElementExcept(colors, currentColor);
    element.style[property] = currentColor;
    element.setAttribute(ARIA_CURRENT_VALUE_ATTRIBUTE, currentColor);
  }
};
