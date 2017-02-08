'use strict';

window.colorsConverter = {
  componentToHex: function(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  },
  rgbToHex: function(colorString) {
    var sub = colorString.substring(4, (colorString.length - 1));
    var splitted = sub.split(', ');
    console.log("#" + this.componentToHex(Number(splitted[0])) + this.componentToHex(Number(splitted[1])) + this.componentToHex(Number(splitted[2])))
    return "#" + this.componentToHex(Number(splitted[0])) + this.componentToHex(Number(splitted[1])) + this.componentToHex(Number(splitted[2]));
  }
};
