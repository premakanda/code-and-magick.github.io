'use strict';
(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COATCAOLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb (0, 0, 0)'];
  var WIZARD_EYESCAOLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var setupElement = document.querySelector('.setup');
  var similarListElement = setupElement.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var getRandomItem = function (arr) {
    var randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  };

  var generateWizards = function (count) {
    var data = [];
    for (var i = 0; i < count; i++) {
      data.push({
        name: getRandomItem(WIZARD_NAMES) + getRandomItem(WIZARD_SURNAMES),
        coatColor: getRandomItem(WIZARD_COATCAOLOR),
        eyesColor: getRandomItem(WIZARD_EYESCAOLOR)
      });
    }
    return data;
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var renderWizards = function (arr) {
    var fragment = document.createDocumentFragment();
    for (var t = 0; t < arr.length; t++) {
      fragment.appendChild(renderWizard(arr[t]));
    }
    similarListElement.appendChild(fragment);
  };

  setupElement.classList.remove('hidden');
  var wizards = generateWizards(4);
  renderWizards(wizards);
  setupElement.querySelector('.setup-similar').classList.remove('hidden');


  // задвние: одеть Надежду
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setupElement.querySelector('.setup-close');

  // var nameForm = setup.querySelector('.setup-user-name');
  var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');

  var WIZARD_FIREBALL = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  wizardCoat.addEventListener('click', function () {
    var colorCoat = getRandomItem(WIZARD_COATCAOLOR);
    wizardCoat.style.fill = colorCoat;
    setupElement.querySelector('input[name="coat-color"]').value = colorCoat;
  });

  wizardEyes.addEventListener('click', function () {
    var colorEyes = getRandomItem(WIZARD_EYESCAOLOR);
    wizardEyes.style.fill = colorEyes;
    setupElement.querySelector('input[name="eyes-color"]').value = colorEyes;
  });

  wizardFireball.addEventListener('click', function () {
    var fireBall = getRandomItem(WIZARD_FIREBALL);
    wizardFireball.style.backgroundColor = fireBall;
    setupElement.querySelector('input[name="fireball-color"]').value = fireBall;
  });

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
      closePopup();
    }
  };

  var openPopup = function () {
    setupElement.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    setupElement.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    setupElement.style = '';
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ENTER_KEYCODE) {
      openPopup();
    }
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ENTER_KEYCODE) {
      closePopup();
    }
  });

  var form = setupElement.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), function (response) {
      setupElement.classList.add('hidden');
    });
    evt.preventDefault();
  });

  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);

    setupElement.querySelector('.setup-similar').classList.remove('hidden');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(successHandler, errorHandler);

})();

