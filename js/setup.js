'use strict';

var setup = document.querySelector('.setup');
var setupOpenBtn = document.querySelector('.setup-open');
var setupForm = document.querySelector('.setup-wizard-form');
var setupCloseBtn = setupForm.querySelector('.setup-close');
var setupSubmitBtn = setupForm.querySelector('.setup-submit');
var setupUserName = setupForm.querySelector('.setup-user-name');
var wizard = setupForm.querySelector('#wizard');
var wizardCoat = wizard.querySelector('#wizard-coat');
var wizardEyes = wizard.querySelector('#wizard-eyes');
var fireball = setupForm.querySelector('.setup-fireball-wrap');
var CSS_CLASS_INVISIBLE = 'invisible';
var USER_NAME_MAXLENGTH = '50';
var ARIA_CURRENT_VALUE_ATTRIBUTE = 'aria-valuenow';
var ARIA_PRESSED_ATTRIBUTE = 'aria-pressed';
var ENTER_KEY_CODE = 13;
var ESCAPE_KEY_CODE = 27;

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


// modal btns event handlers
var setupOpenBtnClickHandler = function (event) {
  open();
};
var setupOpenBtnKeydownHandler = function (event) {
  if (event.keyCode === ENTER_KEY_CODE) {
    open();
  }
};
var setupCloseBtnClickHandler = function (event) {
  close();
};
var setupCloseBtnKeydownHandler = function (event) {
  if (event.keyCode === ENTER_KEY_CODE) {
    close();
  }
};
var setupSubmitBtnKeydownHandler = function (event) {
  if (event.keyCode === ENTER_KEY_CODE) {
    event.preventDefault();
    close();
  }
};
var documentKeydownHandler = function (event) {
  if (event.keyCode === ESCAPE_KEY_CODE) {
    close();
  }
};

// wizard parts event handlers
var wizardCoatClickHandler = function (event) {
  paintElementsWithRandomColor(event, colors.WIZARD_COAT, 'fill');
};
var wizardEyesClickHandler = function (event) {
  paintElementsWithRandomColor(event, colors.WIZARD_EYES, 'fill');
};
var fireballClickHandler = function (event) {
  paintElementsWithRandomColor(event, colors.FIREBALL, 'background');
};

setupOpenBtn.addEventListener('click', setupOpenBtnClickHandler);
setupOpenBtn.addEventListener('keydown', setupOpenBtnKeydownHandler);

// business logic
function open() {
  toggleState(true);

  setupCloseBtn.addEventListener('click', setupCloseBtnClickHandler);
  setupCloseBtn.addEventListener('keydown', setupCloseBtnKeydownHandler);
  document.addEventListener('keydown', documentKeydownHandler);
  setupSubmitBtn.addEventListener('keydown', setupSubmitBtnKeydownHandler);

  wizardCoat.addEventListener('click', wizardCoatClickHandler);
  wizardEyes.addEventListener('click', wizardEyesClickHandler);
  fireball.addEventListener('click', fireballClickHandler);
}

function close() {
  wizardCoat.removeEventListener('click', wizardCoatClickHandler);
  wizardEyes.removeEventListener('click', wizardEyesClickHandler);
  fireball.removeEventListener('click', fireballClickHandler);

  setupCloseBtn.removeEventListener('click', setupCloseBtnClickHandler);
  setupCloseBtn.removeEventListener('keydown', setupCloseBtnKeydownHandler);
  document.removeEventListener('keydown', documentKeydownHandler);
  setupSubmitBtn.removeEventListener('keydown', setupSubmitBtnKeydownHandler);

  toggleState(false);
}

function toggleState(isOpened) {
  if (isOpened) {
    setup.classList.remove(CSS_CLASS_INVISIBLE);
  } else {
    setup.classList.add(CSS_CLASS_INVISIBLE);
  }
  setupUserName.required = isOpened;
  setupUserName.maxlength = isOpened ? USER_NAME_MAXLENGTH : false;
  setupOpenBtn.setAttribute(ARIA_PRESSED_ATTRIBUTE, isOpened.toString());
  setupCloseBtn.setAttribute(ARIA_PRESSED_ATTRIBUTE, (!isOpened).toString());
}

function paintElementsWithRandomColor(event, colorArray, paintMethod) {
  var randomColor = getRandomElement(colorArray);
  event.currentTarget.style[paintMethod] = randomColor;
  event.currentTarget.setAttribute(ARIA_CURRENT_VALUE_ATTRIBUTE, randomColor);
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}
