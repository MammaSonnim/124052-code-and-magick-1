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
var clickHandler;

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

function open() {
  setup.classList.remove('invisible');
  setupUserName.required = true;
  setupUserName.maxlength = 50;

  addClickHandler(wizardCoat, colors.WIZARD_COAT, 'fill');
  addClickHandler(wizardEyes, colors.WIZARD_EYES, 'fill');
  addClickHandler(fireball, colors.FIREBALL, 'background');
}

function close() {
  setup.classList.add('invisible');
  setupUserName.required = false;
  setupUserName.maxlength = false;

  removeClickHandlers([wizardCoat, wizardEyes, fireball]);
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function addClickHandler(target, colors, method) {
  clickHandler = function(event) {
    event.currentTarget.style[method] = getRandomElement(colors);
  };

  target.addEventListener('click', clickHandler);
}

function removeClickHandlers(targets) {
  targets.forEach(function(el, i, arr) {
    el.removeEventListener('click', clickHandler);
  })
}

setupOpenBtn.addEventListener('click', open);
setupCloseBtn.addEventListener('click', close);





