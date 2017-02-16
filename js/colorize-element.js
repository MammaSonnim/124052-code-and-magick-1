'use strict';

window.colorizeElement = (function () {
  /** @const {number} */
  var ENTER_KEY_CODE = 13;

  /**
   * @param {HTMLElement} element
   * @param {Array<string>} colors
   * @param {?Function} cb с логикой покраски
   */
  return function (element, colors, cb) {
    /** @type {string} */
    var currentColor = colors[0];

    element.addEventListener('click', elementClickHandler);
    element.addEventListener('keydown', elementKeydownHandler);

    /** @param {MouseEvent} event */
    function elementClickHandler(event) {
      setRandomColor(event.currentTarget, cb);
    }

    /** @param {KeyboardEvent} event */
    function elementKeydownHandler(event) {
      if (event.keyCode === ENTER_KEY_CODE) {
        setRandomColor(event.currentTarget, cb);
      }
    }

    /**
     * @param {HTMLElement} target
     * @param {?Function} drawMethod callback с логикой покраски
     */
    function setRandomColor(target, drawMethod) {
      currentColor = window.utils.getRandomElementExcept(colors, currentColor);
      target.setAttribute('aria-valuenow', currentColor);

      if (typeof drawMethod === 'function') {
        drawMethod(target, currentColor);
      }
    }
  };
})();
