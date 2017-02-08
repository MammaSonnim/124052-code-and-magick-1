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
   * @param {Array<string>} array
   * @param {string} item элемент массива
   * @return {string} newItem случайный неповторяющийся подряд элемент из массива
   */
  getRandomElementExcept: function (array, item) {
    /** @type {string} */
    var currentItem = item;

    /** @type {string} */
    var newItem = '';

    while (!newItem || newItem === currentItem) {
      newItem = this.getRandomElement(array);
    }

    return newItem;
  }
};
