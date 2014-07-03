(function () {
  'use strict';

  var querySelector = document.querySelector.bind(document);

  var sideNavContainer = querySelector('.side-nav-container');
  var barElement = querySelector('.bar');
  var menuBtn = querySelector('.menu');
  var main = querySelector('main');

  function closeMenu() {
    barElement.classList.remove('open');
    sideNavContainer.classList.remove('open');
  }

  function toggleMenu() {
    barElement.classList.toggle('open');
    sideNavContainer.classList.toggle('open');
  }

  main.addEventListener('click', closeMenu);
  menuBtn.addEventListener('click', toggleMenu);
  sideNavContainer.addEventListener('click', function (event) {
    if (event.target.nodeName === 'A' || event.target.nodeName === 'LI') {
      closeMenu();
    }
  });
})();
