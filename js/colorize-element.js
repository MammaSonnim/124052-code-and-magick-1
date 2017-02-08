'use strict';

window.colorizeElement = function (element, colors, property) {
  element.addEventListener('click', function (event) {
    var currentColor = element.style[property] ?
      window.colorsConverter.rgbToHex('rgb(101, 137, 164)') :
      colors[0];
    var randomColor = window.utils.getRandomElementExcept(colors, currentColor);
    element.style[property] = randomColor;
    element.setAttribute(ARIA_CURRENT_VALUE_ATTRIBUTE, randomColor);
  });
};
