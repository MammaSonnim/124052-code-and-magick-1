'use strict';

window.utils = (function () {
  /**
   * @param {Array.<string>} array
   * @return {string} случайный элемент из массива
   */
  var _getRandomElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  return {
    /**
     * @param {Array<string>} array
     * @param {string} item
     * @return {string} случайный элемент из массива, в котороом уже нет элемента item
     */
    getRandomElementExcept: function (array, item) {
      /** @type {Array<string>} */
      var newArray = [];

      for (var i = 0; i < array.length; i++) {
        if (array[i] !== item) {
          newArray.push(array[i]);
        }
      }

      return _getRandomElement(newArray);
    }
  };
})();
