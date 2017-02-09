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
   * @param {string} item
   * @return {string} newItem случайный неповторяющийся подряд элемент из массива
   */
  getRandomElementExcept: function (array, item) {
    /** @type {Array<string>} */
    var newArray = [];

    for (var i = 0; i < array.length; i++) {
      if (array[i] != item) {
        newArray.push(array[i]);
      }
    }

    return this.getRandomElement(newArray);
  }
};
