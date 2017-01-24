'use strict';

window.renderStatistics = function(ctx, names, times) {

  /**
   * Параметры для отрисовки статистики.
   * @enum
   */
  var statCloud = {
    Polygon: {
      START_X: 100,
      START_Y: 10,
      WIDTH: 420,
      HEIGHT: 270,
      SKEW: 10,
      SHIFT: 10,
      COLOR: '#ffffff',
      SHADOW_COLOR: 'rgba(0, 0, 0, 0.7)',
      PADDING: 30,
    },
    Text: {
      MESSAGE: 'Ура вы победили!\nСписок результатов:',
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
    _drawPolygon(
      statCloud.Polygon.START_X + statCloud.Polygon.SHIFT,
      statCloud.Polygon.START_Y + statCloud.Polygon.SHIFT,
      statCloud.Polygon.WIDTH,
      statCloud.Polygon.HEIGHT,
      statCloud.Polygon.SKEW,
      statCloud.Polygon.SHADOW_COLOR
    );

    _drawPolygon(
      statCloud.Polygon.START_X,
      statCloud.Polygon.START_Y,
      statCloud.Polygon.WIDTH,
      statCloud.Polygon.HEIGHT,
      statCloud.Polygon.SKEW,
      statCloud.Polygon.COLOR
    );

    _drawText(
      statCloud.Polygon.START_X + statCloud.Polygon.PADDING,
      statCloud.Polygon.START_Y + statCloud.Polygon.PADDING,
      statCloud.Text.MESSAGE,
      statCloud.Text.COLOR,
      statCloud.Text.FONT_STYLE,
      statCloud.Text.LINE_HEIGHT,
      statCloud.Text.BASE_LINE
    );
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
   * Отрисовка текста.
   */
  function _drawText(x, y, message, color, font, lineHeight, baseline) {
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.baseline = baseline;

    message.split('\n').forEach(function (line, i) {
      ctx.fillText(line, x, y + lineHeight * i);
    });
  }

  /**
   * Отрисовка гистограммы.
   */
  function _drawHistogram() {

  }
};
