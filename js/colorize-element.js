'use strict';

/**
 * @param {HTMLElement} element
 * @param {Array<string>} colors
 * @param {string} property CSS-свойство для применения цвета
 */
window.colorizeElement = function (element, colors, property) {
  /** @type {string} */
  var currentColor = colors[0];

  /** @const {number} */
  var ENTER_KEY_CODE = 13;

  /** @const {string} */
  var ARIA_CURRENT_VALUE_ATTRIBUTE = 'aria-valuenow';

  element.addEventListener('click', elementClickHandler);
  element.addEventListener('keydown', elementKeydownHandler);

  /** @param {MouseEvent} event */
  function elementClickHandler(event) {
    setRandomColor(event.currentTarget);
  }

  /** @param {KeyboardEvent} event */
  function elementKeydownHandler(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      setRandomColor(event.currentTarget);
    }
  }

  function setRandomColor(target) {
    currentColor = window.utils.getRandomElementExcept(colors, currentColor);
    target.style[property] = currentColor;
    target.setAttribute(ARIA_CURRENT_VALUE_ATTRIBUTE, currentColor);
  }
};
