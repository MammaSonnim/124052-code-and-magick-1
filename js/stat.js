'use strict';

window.renderStatistics = function (ctx, names, times) {
  /**
   * Конфиг для отрисовки статистики.
   */
  var polygonConfig = {
    START_X: 100,
    START_Y: 10,
    WIDTH: 420,
    HEIGHT: 270,
    SKEW: 5,
    SHIFT: 10,
    COLOR: '#ffffff',
    SHADOW_COLOR: 'rgba(0, 0, 0, 0.7)',
    PADDING: 40
  };

  var textConfig = {
    GLORY_MESSAGE: 'Ура вы победили!\nСписок результатов:',
    FAILURE_MESSAGE: 'Вы проиграли!\nПобедитель – ',
    WIDTH: 175,
    COLOR: '#000000',
    FONT_STYLE: '16px PT Mono',
    BASE_LINE: 'hanging',
    LINE_HEIGHT: 20
  };

  var histogramConfig = {
    HEIGHT: 150,
    COL_WIDTH: 40,
    COL_INDENT: 50,
    MY_NAME: 'Вы',
    MY_COLOR: 'rgba(255, 0, 0, 1)',
    BASE_COLOR: 'rgba(0, 0, 255, ',
    TEXT_COLOR: 'rgba(0, 0, 0, 0.7)',
    POS_Y: 100,
    SHIFT: 10
  };

  var length = names.length;
  var results = _getUsers(names, times);

  /**
   * Сборка данных пользователей в один массив
   * @return {Array.<Object>} usersArray
   */
  function _getUsers() {
    var usersArray = [];
    var winner = null;
    var maxTime = -1;

    for (var i = 0; i < length; i++) {
      var time = times[i];
      var user = {
        name: names[i],
        time: time
      };

      if (time > maxTime) {
        winner = user;
        maxTime = time;
      }

      usersArray.push(user);
    }
    winner.isWinner = true;

    return usersArray;
  }

  /**
   * @param {number} x координата левого верхнего угла
   * @param {number} y координата левого верхнего угла
   * @param {number} width
   * @param {number} height
   * @param {number} skew
   * @param {string} color
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
   * @param {number} lineHeight
   * @param {string} baseline
   * @param {string} myName имя пользователя
   */
  function _drawVerdictText(x, y, gloryMessage, failureMessage, color, font, lineHeight, baseline, myName) {
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.baseline = baseline;

    var message;

    for (var i = 0; i < length; i++) {
      if (results[i].isWinner) {
        message = results[i].name === myName ?
          gloryMessage : failureMessage + results[i].name + '!';
      }
    }

    message.split('\n').forEach(function (line, n) {
      ctx.fillText(line, x, y + lineHeight * n);
    });
  }

  /**
   * @param {number} x координата левого верхнего угла
   * @param {number} y координата левого верхнего угла
   * @param {number} height максимальная высота колонки
   * @param {number} colWidth
   * @param {number} colIndent
   * @param {number} colStep шаг роста высоты колонки
   * @param {string} textColor
   * @param {string} colBaseColor базовый цвет для расчета цвета колонок других игроков
   * @param {string} colMyColor цвет колонки пользователя
   * @param {number} posY сдвиг позиционирования всех элементов гистограммы
   * @param {number} shift отступ между элементами гистограммы
   * @param {string} myName имя пользователя
   */
  function _drawHistogram(x, y, height, colWidth, colIndent, colStep, textColor, colBaseColor, colMyColor, posY, shift, myName) {
    var histogramStep = colStep;
    var colWithIndent = (colWidth + colIndent);

    for (var i = 0; i < results.length; i++) {
      var name = results[i].name;
      var time = results[i].time;
      var colHeight = histogramStep * time;
      var colX = x + colWithIndent * i;

      ctx.fillStyle = textColor;

      ctx.fillText(time.toFixed(0), colX, height - colHeight - shift + posY);
      ctx.fillText(name, colX, y + height + shift + posY);

      if (results[i].name === myName) {
        ctx.fillStyle = colMyColor;
      } else {
        ctx.fillStyle = _getHistogramColor(colBaseColor);
      }

      ctx.fillRect(colX, height - colHeight + posY, colWidth, colHeight);
    }
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
    var opacity = Math.random() * 0.4 + 0.5;

    return color + opacity + ')';
  }

  /**
   * @return {number}
   */
  function _getMaxResult() {
    var max = -1;

    for (var i = 0; i < results.length; i++) {
      var time = results[i].time;
      if (time > max) {
        max = time;
      }
    }
    return max;
  }


  _drawPolygon(
      polygonConfig.START_X + polygonConfig.SHIFT,
      polygonConfig.START_Y + polygonConfig.SHIFT,
      polygonConfig.WIDTH,
      polygonConfig.HEIGHT,
      polygonConfig.SKEW,
      polygonConfig.SHADOW_COLOR
  );

  _drawPolygon(
      polygonConfig.START_X,
      polygonConfig.START_Y,
      polygonConfig.WIDTH,
      polygonConfig.HEIGHT,
      polygonConfig.SKEW,
      polygonConfig.COLOR
  );

  _drawVerdictText(
      polygonConfig.START_X + polygonConfig.PADDING,
      polygonConfig.START_Y + polygonConfig.PADDING,
      textConfig.GLORY_MESSAGE,
      textConfig.FAILURE_MESSAGE,
      textConfig.COLOR,
      textConfig.FONT_STYLE,
      textConfig.LINE_HEIGHT,
      textConfig.BASE_LINE,
      histogramConfig.MY_NAME
  );

  _drawHistogram(
      polygonConfig.START_X + polygonConfig.PADDING,
      polygonConfig.START_Y,
      histogramConfig.HEIGHT,
      histogramConfig.COL_WIDTH,
      histogramConfig.COL_INDENT,
      _getHistogramStep(histogramConfig.HEIGHT),
      histogramConfig.TEXT_COLOR,
      histogramConfig.BASE_COLOR,
      histogramConfig.MY_COLOR,
      histogramConfig.POS_Y,
      histogramConfig.SHIFT,
      histogramConfig.MY_NAME
  );
};

