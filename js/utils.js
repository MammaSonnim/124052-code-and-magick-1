'use strict';

window.utils = {
  /**
   * @param {Array.<string>} array
   * @return {string} случайный элемент из массива
   */
  getRandomElement: function (array) {
    return array[Math.floor(Math.random() * array.length)];
  },

  /**
   * @param {Array<string>} array – пример [1, 2, 3]
   * @param {string} item – элемент массива, пример 1
   * @return {string} newItem случайный неповторяющийся подряд элемент из массива
   */
  getRandomElementExcept: function (array, item) {
    /** @type {number} */
    var currentIndex = array.indexOf(item);  // 0

    array.splice(currentIndex, 1); // [2, 3]

    /** @type {string} */
    var newItem = this.getRandomElement(array); // 2

    array.push(item); // [2, 3, 1]

    return newItem;
  }
};
