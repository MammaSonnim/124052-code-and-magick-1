'use strict';

/** @type {HTMLElement} */
var setup = document.querySelector('.setup');

/** @type {HTMLElement} */
var setupOpenBtn = document.querySelector('.setup-open');

/** @type {HTMLElement} */
var setupForm = document.querySelector('.setup-wizard-form');

/** @type {HTMLElement} */
var setupCloseBtn = setupForm.querySelector('.setup-close');

/** @type {HTMLElement} */
var setupSubmitBtn = setupForm.querySelector('.setup-submit');

/** @type {HTMLElement} */
var setupUserName = setupForm.querySelector('.setup-user-name');

/** @type {HTMLElement} */
var wizard = setupForm.querySelector('#wizard');

/** @type {HTMLElement} */
var wizardCoat = wizard.querySelector('#wizard-coat');

/** @type {HTMLElement} */
var wizardEyes = wizard.querySelector('#wizard-eyes');

/** @type {HTMLElement} */
var fireball = setupForm.querySelector('.setup-fireball-wrap');

/** @const {string} */
var CSS_CLASS_INVISIBLE = 'invisible';

/** @const {number} */
var USER_NAME_MAXLENGTH = 50;

/** @const {string} */
var ARIA_HIDDEN_ATTRIBUTE = 'aria-hidden';

/** @const {string} */
var ARIA_PRESSED_ATTRIBUTE = 'aria-pressed';

/** @const {number} */
var ENTER_KEY_CODE = 13;

/** @const {number} */
var ESCAPE_KEY_CODE = 27;

/** Словарь всех цветов. */
var colors = {
  WIZARD_COAT: [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ],
  WIZARD_EYES: [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ],
  FIREBALL: [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ]
};

var setupOpenBtnClickHandler = function (event) {
  open();
};

var setupOpenBtnKeydownEnterHandler = function (event) {
  if (event.keyCode === ENTER_KEY_CODE) {
    open();
  }
};

var setupCloseBtnClickHandler = function (event) {
  close();
};

var setupCloseBtnKeydownEnterHandler = function (event) {
  if (event.keyCode === ENTER_KEY_CODE) {
    close();
  }
};

var setupSubmitBtnKeydownEnterHandler = function (event) {
  if (event.keyCode === ENTER_KEY_CODE) {
    event.preventDefault();
    close();
  }
};

var documentKeydownEscHandler = function (event) {
  if (event.keyCode === ESCAPE_KEY_CODE) {
    close();
  }
};

setupOpenBtn.addEventListener('click', setupOpenBtnClickHandler);
setupOpenBtn.addEventListener('keydown', setupOpenBtnKeydownEnterHandler);

/** Открытие окна настроек мага — переключение состояния и навешивание слушателей событий */
function open() {
  toggleState(true);

  setupCloseBtn.addEventListener('click', setupCloseBtnClickHandler);
  setupCloseBtn.addEventListener('keydown', setupCloseBtnKeydownEnterHandler);
  document.addEventListener('keydown', documentKeydownEscHandler);
  setupSubmitBtn.addEventListener('keydown', setupSubmitBtnKeydownEnterHandler);

  window.colorizeElement(wizardCoat, colors.WIZARD_COAT, 'fill');
  window.colorizeElement(wizardEyes, colors.WIZARD_EYES, 'fill');
  window.colorizeElement(fireball, colors.FIREBALL, 'background');
}

/** Закрытие окна настроек мага — переключение состояния и снятие слушателей событий */
function close() {
  setupCloseBtn.removeEventListener('click', setupCloseBtnClickHandler);
  setupCloseBtn.removeEventListener('keydown', setupCloseBtnKeydownEnterHandler);
  document.removeEventListener('keydown', documentKeydownEscHandler);
  setupSubmitBtn.removeEventListener('keydown', setupSubmitBtnKeydownEnterHandler);

  toggleState(false);
}

/**
 * Переключает состояние различных аттрибутов в зависимости от флага
 * @param {boolean} isOpened
 */
function toggleState(isOpened) {
  if (isOpened) {
    setup.classList.remove(CSS_CLASS_INVISIBLE);
  } else {
    setup.classList.add(CSS_CLASS_INVISIBLE);
  }
  setupUserName.required = isOpened;
  setupUserName.maxLength = isOpened ? USER_NAME_MAXLENGTH : false;
  setupOpenBtn.setAttribute(ARIA_PRESSED_ATTRIBUTE, (isOpened).toString());
  setupCloseBtn.setAttribute(ARIA_HIDDEN_ATTRIBUTE, (!isOpened).toString());
}
