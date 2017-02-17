'use strict';

window.colorizeElement = (function () {
  /** @const {number} */
  var ENTER_KEY_CODE = 13;

  /**
   * @param {HTMLElement} element
   * @param {Array<string>} colors
   * @param {Function=} optCallback с логикой покраски
   */
  return function (element, colors, optCallback) {
    /** @type {string} */
    var currentColor = colors[0];

    element.addEventListener('click', elementClickHandler);
    element.addEventListener('keydown', elementKeydownHandler);

    /** @param {MouseEvent} event */
    function elementClickHandler(event) {
      setRandomColor(event.currentTarget, optCallback);
    }

    /** @param {KeyboardEvent} event */
    function elementKeydownHandler(event) {
      if (event.keyCode === ENTER_KEY_CODE) {
        setRandomColor(event.currentTarget, optCallback);
      }
    }

    /**
     * @param {HTMLElement} target
     * @param {Function=} optDrawMethod callback с логикой покраски
     */
    function setRandomColor(target, optDrawMethod) {
      currentColor = window.utils.getRandomElementExcept(colors, currentColor);
      target.setAttribute('aria-valuenow', currentColor);

      if (typeof optDrawMethod === 'function') {
        optDrawMethod(target, currentColor);
      } else {
        target.style.fill = currentColor;
      }
    }
  };
})();
