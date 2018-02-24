activeTechInfos = [];

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

function toggleSkillInfo() {
  var skillItem = document.getElementById(this.dataset.target);
  var opacity = skillItem.style.opacity;

  if (opacity === '1') {
    skillItem.style.height = '0px';
    window.setTimeout(function () {
      skillItem.style.opacity = '0';
    }, 600);
  } else {
    skillItem.style.height = '330px';
    skillItem.style.opacity = '1';
  }
}

function hideTechInfo(techItem) {
  techItem.style.height = '0';
  techItem.style.display = 'none';
}

function showTechInfo(techItem) {
  techItem.style.display = 'block';
  techItem.style.height = '100%';
}

function toggleTechInfo() {
  var techItem = document.getElementById(this.dataset.target);
  var display = techItem.style.display;

  if (display != 'block') {
    for (var i = 0; i < activeTechInfos.length; i++) {
      var otherTechInfo = activeTechInfos.pop();
      otherTechInfo = document.getElementById(otherTechInfo);

      hideTechInfo(otherTechInfo);
    }

    showTechInfo(techItem);
    activeTechInfos.push(this.dataset.target);
  } else {
    hideTechItem(techItem);
    if (activeTechInfos.indexOf(this.dataset.target) > -1) {
      var index = activeTechInfos.indexOf(this.dataset.target);
      activeTechInfos.splice(index, 1);
    }
  }
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

  var skillItems = document.getElementsByClassName('field-image');

  for (var i = 0; i < skillItems.length; i++) {
    var skillItem = skillItems.item(i);

    skillItem.addEventListener('click', toggleSkillInfo);
  }

  var techIcons = document.getElementsByClassName('tech-icon');

  for (var i = 0; i < techIcons.length; i++) {
    var techIcon = techIcons.item(i);

    techIcon.addEventListener('click', toggleTechInfo);
  }
});
