const activeTechInfos = ['tech-initial'];
const TERMINAL_TEXT_OPTS = [
	'echo hello world',
	'sudo rm -rf /',
	'npm run burnthemall',
	'rm -rf node_modules',
	'pipenv shell --python 3',
	'chmod +x manage.py',
	'du -hs *',
	'ngrok http 1234',
	'sudo apt update && sudo apt upgrade',
	'pacman -Syu',
	'vim --clean ~/.vimrc',
	'make clean && make',
	'cabal init -n --is-executable'
];
const HEADER_TEXT_OPTS = [
  'Developer at Large',
  'The Last Currybender',
  'Narrated by Morgan Freeman',
  'Web Design and Development',
	'Shoebills Terrify Me',
  'Click for New Byline',
  'Architectural Anarchist',
	'Recursing Recusion Recursively',
	'Continually Currying Curries',
	'Will Violate Immutability for Food'
];
const TERMINAL_TEXT_TIMING = 100;  // ms
const TERMINAL_TEXT_REPLACE_INTERVAL = 5000;  // ms

let navOpen = false;

function showNav() {
	const nav = document.querySelector('#mobile-nav');
	const hamburger = document.querySelector('#hamburger');

	nav.classList.add('mobile-nav-shown');
	nav.style.right = '0px';
	hamburger.classList.add('open-hamburger');

	navOpen = true;
}

function hideNav() {
	const nav = document.querySelector('#mobile-nav');
	const hamburger = document.querySelector('#hamburger');

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
	let current = start;
	const direction = start <= end ? 10 : -10;

	var tick = setInterval(() => {
		if (current === end) {
			clearInterval(tick);
		} else {
			current += direction;
			element.style.transform = 'rotateX(' + current + 'deg)';
		}
	}, ms / (Math.abs(start - end) / 10));
}

function toggleSkillInfo() {
	const skillItem = document.getElementById(this.dataset.target + '-text');
	const opacity = skillItem.style.opacity;
	const selectorArrow = document.getElementById(this.dataset.target + '-arrow');

	if (opacity === '1') {
		skillItem.style.height = '0px';
		window.setTimeout(() => {
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
	window.setTimeout(() => {
		techItem.style.height = techItem.scrollHeight + 'px';
	}, 25);
}

function toggleTechInfo() {
	const techItem = document.getElementById(this.dataset.target);
	const display = techItem.style.display;

	if (display != 'block') {
		for (let i = 0; i < activeTechInfos.length; i++) {
			let otherTechInfo = activeTechInfos.pop();
			otherTechInfo = document.getElementById(otherTechInfo);

			hideTechInfo(otherTechInfo);
		}

		showTechInfo(techItem);
		activeTechInfos.push(this.dataset.target);
	} else {
		hideTechItem(techItem);
		if (activeTechInfos.indexOf(this.dataset.target) > -1) {
			const index = activeTechInfos.indexOf(this.dataset.target);
			activeTechInfos.splice(index, 1);
		}
	}
}

function loadBlog(event) {
	event.preventDefault();
	window.location = this.dataset.location;
}

function selectTextFromArray(arr) {
	const randomInt = Math.floor(
		Math.random() * Math.floor(arr.length));

	return arr[randomInt];
}

function typeTerminalText(element, text) {
	let i = 0;
	element.textContent = '';

	const interval = setInterval(() => {
		if (i < text.length) {
			element.textContent = element.textContent + text[i++];
		} else {
			clearInterval(interval);
			setTimeout(
				() => changeTerminalText(element), TERMINAL_TEXT_REPLACE_INTERVAL);
		}
	}, TERMINAL_TEXT_TIMING);
}

function changeTerminalText(element) {
	typeTerminalText(element, selectTextFromArray(TERMINAL_TEXT_OPTS));
}

function changeHeaderText(element) {
	element.textContent = selectTextFromArray(HEADER_TEXT_OPTS);
}

document.addEventListener('DOMContentLoaded', () => {
	const path = window.location.pathname;
	let active = '';

	header = document.querySelector('.header-right');
	if (header) {
		changeHeaderText(header);

		header.addEventListener('click', () => changeHeaderText(header));
	}

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

	const activeNavs = document.getElementsByClassName(active);
	for (let i = 0; i < activeNavs.length; i++) {
		const activeNav = activeNavs.item(i);
		activeNav.classList.add('nav-item-active');
	}

	const skillItems = document.querySelectorAll('.field-image');

	for (let i = 0; i < skillItems.length; i++) {
		const skillItem = skillItems.item(i);

		skillItem.addEventListener('click', toggleSkillInfo);
	}

	const techIcons = document.querySelectorAll('.tech-icon');

	for (let i = 0; i < techIcons.length; i++) {
		const techIcon = techIcons.item(i);

		techIcon.addEventListener('click', toggleTechInfo);
	}

	const blogItems = document.querySelectorAll('.blog-list-item-linked');

	for (let i = 0; i < blogItems.length; i++) {
		const blogItem = blogItems.item(i);

		blogItem.addEventListener('click', loadBlog);
	}

	const terminalText = document.querySelector('#terminal-text');

	if (terminalText) {
		typeTerminalText(terminalText, selectTextFromArray(TERMINAL_TEXT_OPTS));
	}
});
