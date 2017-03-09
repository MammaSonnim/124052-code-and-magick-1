'use strict';

(function () {
  /** @type {HTMLElement} */
  var shopElement = document.querySelector('.setup-artifacts-shop');

  /** @type {HTMLElement} */
  var artifactsElement = document.querySelector('.setup-artifacts');

  /** @type {HTMLElement} */
  var draggedItem = null;

  /** @const {string} */
  var BACKGROUND_COLOR = 'yellow';

  shopElement.addEventListener('dragstart', function (event) {
    if (event.target.tagName.toLowerCase() === 'img') {
      draggedItem = event.target;
      event.dataTransfer.setData('text/plain', event.target.alt);
    }
  });

  artifactsElement.addEventListener('dragover', function (event) {
    event.preventDefault();
    return false;
  });

  artifactsElement.addEventListener('drop', function (event) {
    event.target.style.backgroundColor = '';
    event.target.appendChild(draggedItem);
  });

  artifactsElement.addEventListener('dragenter', function (event) {
    event.target.style.backgroundColor = BACKGROUND_COLOR;
    event.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (event) {
    event.target.style.backgroundColor = '';
    event.preventDefault();
  });
})();
