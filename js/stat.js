'use strict';

window.renderStatistics = function(ctx, names, times) {

  /**
   *  Конфиг для отрисовки статистики.
   * @enum
   */
  var statCloudConfig = {
    Polygon: {
      START_X: 100,
      START_Y: 10,
      WIDTH: 420,
      HEIGHT: 270,
      SKEW: 10,
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
      BASE_COLOR: 'rgba(0, 0, 255, 1)'
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

    _drawMultiLineText(
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
      _getHistogramStep(statCloudConfig.Histogram.HEIGHT)
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
  function _drawMultiLineText(x, y, gloryMessage, failureMessage, color, font, lineHeight, baseline, name) {
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.baseline = baseline;

    var message = _hasUserWon(name) ? gloryMessage : failureMessage;

    message.split('\n').forEach(function (line, i) {
      ctx.fillText(line, x, y + lineHeight * i);
    });
  }

  /**
   * Отрисовка гистограммы.
   */
  function _drawHistogram(x, y, height, colWidth, colIndent, colStep) {
    var histogramStep = colStep;
    var colWithIndent = (colWidth + colIndent);

    for (var i = 0; i < times.length; i++) {
      var name = names[i];
      var time = times[i];
      var colHeight = histogramStep * time;
      var colX = x + colWithIndent * i;

      if (names[i] === statCloudConfig.Histogram.MY_NAME) {
        ctx.fillStyle = statCloudConfig.Histogram.MY_COLOR;
      } else {
        ctx.fillStyle = _getHistogramColor();
      }

      ctx.fillRect(colX, y, colWidth, colHeight);

      ctx.fillText(name + ':' + time.toFixed(0), colX, y + height);
    }
  }

  function _hasUserWon(name) {
    return times.indexOf(_getMaxResult()) === names.indexOf(name);
  }

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

  function _getHistogramStep(height) {
    var max = _getMaxResult();
    return height / max;
  }

  function _getHistogramColor() {
    var opacity = Math.random();

    if (opacity < 0.5 || opacity > 1) {
      return _getHistogramColor();
    } else {
      return 'rgba(0, 0, 255, ' + opacity +  ')'
    }
  }
};
