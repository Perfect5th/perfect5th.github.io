function showNav(event) {
  var navItems = document.getElementById('nav-items');
  var hamburger = document.getElementById('hamburger');

  hamburger.style.display = 'none';
  navItems.classList.add('nav-items-shown');
  navItems.style.left = '0px';
}

function closeNav(event) {
  var navItems = document.getElementById('nav-items');
  var hamburger = document.getElementById('hamburger');

  navItems.classList.remove('nav-items-shown');
  navItems.style.left = '105px';

  setTimeout(function () {
    hamburger.style.display = 'block';
  }, 500);
}

document.addEventListener("DOMContentLoaded", function () {
  var path = window.location.pathname;
  var active = '';

  switch (path) {
    case '/posts':
      active = 'nav-blog';
      break;
    case '/projects':
      active = 'nav-projects';
      break;
    default:
      active = 'nav-home';
  }

  var activeNav = document.getElementById(active);
  activeNav.classList.add('nav-item-active');
});
