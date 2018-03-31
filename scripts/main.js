var activeTechInfos = ['tech-initial'];
var navOpen = false;


function showNav() {
  var nav = document.getElementById('mobile-nav');
  var hamburger = document.getElementById('hamburger');

  nav.classList.add('mobile-nav-shown');
  nav.style.right = '0px';
  hamburger.classList.add('open-hamburger');

  navOpen = true;
}

function hideNav() {
  var nav = document.getElementById('mobile-nav');
  var hamburger = document.getElementById('hamburger');

  nav.classList.remove('mobile-nav-shown');
  nav.style.right = '-160px';
  hamburger.classList.remove('open-hamburger');

  navOpen = false;
}

function toggleNav(event) {
  if (navOpen) {
    hideNav();
  } else {
    showNav();
  }
}

function flipVertically(element, start, end, ms) {
  var current = start;
  var direction = start <= end ? 10 : -10;

  var tick = setInterval(function () {
    if (current === end) {
      clearInterval(tick);
    } else {
      current += direction;
      element.style.transform = 'rotateX(' + current + 'deg)';
    }
  }, ms / (Math.abs(start - end) / 10));
}

function toggleSkillInfo() {
  var skillItem = document.getElementById(this.dataset.target + '-text');
  var opacity = skillItem.style.opacity;
  var selectorArrow = document.getElementById(this.dataset.target + '-arrow');

  if (opacity === '1') {
    skillItem.style.height = '0px';
    window.setTimeout(function () {
      skillItem.style.opacity = '0';
    }, 600);

    flipVertically(selectorArrow, 180, 0, 250);

  } else {
    skillItem.style.height = skillItem.scrollHeight + 'px';
    skillItem.style.opacity = '1';

    flipVertically(selectorArrow, 0, 180, 250);
  }
}

function hideTechInfo(techItem) {
  techItem.style.height = '0px';
  techItem.style.display = 'none';
}

function showTechInfo(techItem) {
  techItem.style.display = 'block';
  window.setTimeout(function () {
    techItem.style.height = techItem.scrollHeight + 'px';
  }, 25);
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

function loadBlog(event) {
  event.preventDefault();
  window.location = this.dataset.location;
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
    case '/':
      active = 'nav-home';
      break;
    default:
      active = 'nav-blog';
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

  var blogItems = document.getElementsByClassName('blog-list-item-linked');

  for (var i = 0; i < blogItems.length; i++) {
    var blogItem = blogItems.item(i);

    blogItem.addEventListener('click', loadBlog);
  }
});
