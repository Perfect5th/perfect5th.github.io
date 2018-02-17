function showNav(event) {
  var navItems = document.getElementById('nav-items');
  var hamburger = document.getElementById('hamburger');

  hamburger.style.display = 'none';
  navItems.classList.add('nav-items-shown');
  navItems.style.left = '0px';
}
