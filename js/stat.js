'use strict';

window.renderStatistics = function(ctx, names, times) {

  /**
   * Конфиг для отрисовки статистики.
   * @enum
   */
  var statCloudConfig = {
    Polygon: {
      START_X: 100,
      START_Y: 10,
      WIDTH: 420,
      HEIGHT: 270,
      SKEW: 5,
      SHIFT: 10,
      COLOR: '#ffffff',
      SHADOW_COLOR: 'rgba(0, 0, 0, 0.7)',
      PADDING: 40
    },
    Text: {
      GLORY_MESSAGE: 'Ура вы победили!\nСписок результатов:',
      FAILURE_MESSAGE: 'Вы проиграли!\nСписок результатов:',
      WIDTH: 175,
      COLOR: '#000000',
      FONT_STYLE: '16px PT Mono',
      BASE_LINE: 'hanging',
      LINE_HEIGHT: 20
    },
    Histogram: {
      HEIGHT: 150,
      COL_WIDTH: 40,
      COL_INDENT: 50,
      MY_NAME: 'Вы',
      MY_COLOR: 'rgba(255, 0, 0, 1)',
      BASE_COLOR: 'rgba(0, 0, 255, ',
      TEXT_COLOR: 'rgba(0, 0, 0, 0.7)',
      POS_Y: 100,
      SHIFT: 10
    }
  };

  /**
   * Сборка всех частей облака статистики.
   */
  function getAllStatElements() {
    _drawPolygon(
      statCloudConfig.Polygon.START_X + statCloudConfig.Polygon.SHIFT,
      statCloudConfig.Polygon.START_Y + statCloudConfig.Polygon.SHIFT,
      statCloudConfig.Polygon.WIDTH,
      statCloudConfig.Polygon.HEIGHT,
      statCloudConfig.Polygon.SKEW,
      statCloudConfig.Polygon.SHADOW_COLOR
    );

    _drawPolygon(
      statCloudConfig.Polygon.START_X,
      statCloudConfig.Polygon.START_Y,
      statCloudConfig.Polygon.WIDTH,
      statCloudConfig.Polygon.HEIGHT,
      statCloudConfig.Polygon.SKEW,
      statCloudConfig.Polygon.COLOR
    );

    _drawVerdictText(
      statCloudConfig.Polygon.START_X + statCloudConfig.Polygon.PADDING,
      statCloudConfig.Polygon.START_Y + statCloudConfig.Polygon.PADDING,
      statCloudConfig.Text.GLORY_MESSAGE,
      statCloudConfig.Text.FAILURE_MESSAGE,
      statCloudConfig.Text.COLOR,
      statCloudConfig.Text.FONT_STYLE,
      statCloudConfig.Text.LINE_HEIGHT,
      statCloudConfig.Text.BASE_LINE,
      statCloudConfig.Histogram.MY_NAME
    );

    _drawHistogram(
      statCloudConfig.Polygon.START_X + statCloudConfig.Polygon.PADDING,
      statCloudConfig.Polygon.START_Y,
      statCloudConfig.Histogram.HEIGHT,
      statCloudConfig.Histogram.COL_WIDTH,
      statCloudConfig.Histogram.COL_INDENT,
      _getHistogramStep(statCloudConfig.Histogram.HEIGHT),
      statCloudConfig.Histogram.TEXT_COLOR,
      statCloudConfig.Histogram.BASE_COLOR,
      statCloudConfig.Histogram.MY_COLOR,
      statCloudConfig.Histogram.POS_Y,
      statCloudConfig.Histogram.SHIFT,
      statCloudConfig.Histogram.MY_NAME
    );
  }

  getAllStatElements();

  /**
   * @param {number} x координата левого верхнего угла
   * @param {number} y координата левого верхнего угла
   * @param {number} width ширина многоуголника
   * @param {number} height высота многоуголника
   * @param {?number} skew скос
   * @param {string} color цвет многоуголника
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
   * @param {number} x координата левого верхнего угла
   * @param {number} y координата левого верхнего угла
   * @param {string} gloryMessage текст, когда пользователь победил
   * @param {string} failureMessage текст, когда пользователь проиграл
   * @param {string} color цвет шрифта
   * @param {string} font стиль шрифта
   * @param {number} lineHeight высота строки
   * @param {string} baseline режим базовой линии
   * @param {string} name имя пользователя
   */
  function _drawVerdictText(x, y, gloryMessage, failureMessage, color, font, lineHeight, baseline, name) {
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.baseline = baseline;

    var message = _hasUserWon(name) ? gloryMessage : failureMessage;

    message.split('\n').forEach(function (line, i) {
      ctx.fillText(line, x, y + lineHeight * i);
    });
  }

  /**
   * @param {number} x координата левого верхнего угла
   * @param {number} y координата левого верхнего угла
   * @param {number} height максимальная высота колонки
   * @param {number} colWidth ширина колонки
   * @param {number} colIndent расстояние между колонками
   * @param {number} colStep шаг роста высоты колонки
   * @param {string} textColor цвет шрифта
   * @param {string} colBaseColor базовый цвет для расчета цвета колонок других игроков
   * @param {string} colMyColor цвет колонки пользователя
   * @param {number} posY сдвиг позиционирования всех элементов гистограммы
   * @param {number} shift отступ между элементами гистограммы
   * @param {string} myName имя пользователя
   */
  function _drawHistogram(x, y, height, colWidth, colIndent, colStep, textColor, colBaseColor, colMyColor, posY, shift, myName) {
    var histogramStep = colStep;
    var colWithIndent = (colWidth + colIndent);

    for (var i = 0; i < times.length; i++) {
      var name = names[i];
      var time = times[i];
      var colHeight = histogramStep * time;
      var colX = x + colWithIndent * i;

      ctx.fillStyle = textColor;

      ctx.fillText(time.toFixed(0), colX, height - colHeight - shift + posY);
      ctx.fillText(name, colX, y + height + shift + posY);

      if (names[i] === myName) {
        ctx.fillStyle = colMyColor;
      } else {
        ctx.fillStyle = _getHistogramColor(colBaseColor);
      }

      ctx.fillRect(colX, height - colHeight + posY, colWidth, colHeight);
    }
  }

  /**
   * @param {string} name имя пользователя
   * @return {boolean}
   */
  function _hasUserWon(name) {
    return times.indexOf(_getMaxResult()) === names.indexOf(name);
  }

  /**
   * @param {number} height максимальная высота колонки
   * @return {number}
   */
  function _getHistogramStep(height) {
    var max = _getMaxResult();
    return height / max;
  }

  /**
   * @param {string} color базовый цвет колонок других игроков
   * @return {string}
   */
  function _getHistogramColor(color) {
    var opacity = Math.random();

    if (opacity < 0.5 || opacity > 1) {
      return _getHistogramColor();
    } else {
      return color + opacity +  ')'
    }
  }

  /**
   * @return {number}
   */
  function _getMaxResult() {
    var max = -1;

    for(var i = 0 ; i < times.length; i++ ) {
      var time = times[i];
      if (time > max) {
        max = time;
      }
    }
    return max;
  }
};
