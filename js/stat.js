'use strict';

window.renderStatistics = function(ctx, names, times) {

  /**
   * Параметры для отрисовки статистики.
   * @enum
   */
  var statCloud = {
    Polygon: {
      WIDTH: 350,
      SKEW: 10,
      SHIFT: 10,
      COLOR: '#ffffff',
      SHADOW_COLOR: 'rgba(0, 0, 0, 0.7)',
      PADDING: 20,
      POS_X: 50,
      POS_Y: 0
    },
    Text: {
      WIDTH: 175,
      COLOR: '#000000',
      FONT_STYLE: '16px PT Mono',
      BASE_LINE: 'hanging',
      LINE_HEIGHT: 20
    }
  };

  /**
   * Сборка всех частей облака статистики.
   */
  function getAllStatElements() {
    var startX = 180;
    var startY = 30;
    var rectangleHeight = 100;

    _drawPolygon(
      startX + statCloud.Polygon.SHIFT,
      startY + statCloud.Polygon.SHIFT,
      statCloud.Polygon.WIDTH,
      rectangleHeight,
      statCloud.Polygon.SKEW,
      statCloud.Polygon.SHADOW_COLOR);

    _drawPolygon(
      startX,
      startY,
      statCloud.Polygon.WIDTH,
      rectangleHeight,
      statCloud.Polygon.SKEW,
      statCloud.Polygon.COLOR);
  }

  getAllStatElements();

  /**
   * Отрисовка многоугольника.
   */
  function _drawPolygon(x, y, width, height, skew, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.lineTo(x + skew, y + height / 2);
    ctx.lineTo(x, y + height);
    ctx.lineTo(x + width / 2, y + height - skew);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x + width - skew, y + height / 2);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width / 2, y + skew);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();
    ctx.fill();
  }

  /**
   * Отрисовка гистограммы.
   */
  function _drawHistogram() {

  }
};
