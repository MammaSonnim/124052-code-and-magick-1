'use strict';

var setup = document.querySelector('.setup');
var setupOpenBtn = document.querySelector('.setup-open');
var setupForm = document.querySelector('.setup-wizard-form');
var setupCloseBtn = setupForm.querySelector('.setup-close');
var setupUserName = setupForm.querySelector('.setup-user-name');
var wizard = setupForm.querySelector('#wizard');
var wizardCoat = wizard.querySelector('#wizard-coat');
var wizardEyes = wizard.querySelector('#wizard-eyes');
var fireball = setupForm.querySelector('.setup-fireball-wrap');
var CSS_CLASS_INVISIBLE = 'invisible';
var USER_NAME_MAXLENGTH = '50';
var ARIA_CURRENT_VALUE_ATTRIBUTE = 'aria-valuenow';
var ARIA_PRESSED_ATTRIBUTE = 'aria-pressed';

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

// wizard click handlers
var wizardCoatClickHandler = function (event) {
  paintElementsWithRandomColor(event, colors.WIZARD_COAT, 'fill');
};
var wizardEyesClickHandler = function (event) {
  paintElementsWithRandomColor(event, colors.WIZARD_EYES, 'fill');
};
var fireballClickHandler = function (event) {
  paintElementsWithRandomColor(event, colors.FIREBALL, 'background');
};

// business logic
function open() {
  toggleState(true);

  wizardCoat.addEventListener('click', wizardCoatClickHandler);
  wizardEyes.addEventListener('click', wizardEyesClickHandler);
  fireball.addEventListener('click', fireballClickHandler);
}

function close() {
  wizardCoat.removeEventListener('click', wizardCoatClickHandler);
  wizardEyes.removeEventListener('click', wizardEyesClickHandler);
  fireball.removeEventListener('click', fireballClickHandler);

  toggleState(false);
}

function toggleState(isOpened) {
  setup.classList.toggle(CSS_CLASS_INVISIBLE);
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

setupOpenBtn.addEventListener('click', open);
setupCloseBtn.addEventListener('click', close);
