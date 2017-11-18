document.addEventListener('DOMContentLoaded', initElements);

function initElements() {
  var p = document.getElementsByClassName('blog-list-item');

  for (var i = 0; i < p.length; i++) {
    var item = p.item(i);
    item.onmouseover = colorHeader;
    item.onmouseout = revertHeader;
  }

  var pickers = document.getElementsByClassName('colour-choice');

  for (var i = 0; i < pickers.length; i++) {
    var item = pickers.item(i);

    item.onclick = changeThemeColour;
  }
}

function colorHeader() {
  var h2 = this.getElementsByTagName('h2').item(0);
  h2.classList.add('hovered');
}

function revertHeader() {
  var h2 = this.getElementsByTagName('h2').item(0);
  h2.classList.remove('hovered');
}

function changeThemeColour() {
  var themeColour = this.dataset.colour;
  var root = document.getElementById('root');

  if (root.classList.length > 0)
    root.classList.replace(root.classList.item(0), themeColour);
  else
    root.classList.add(themeColour);

  var otherColours = document.getElementsByClassName('colour-choice');
  for (var i = 0; i < otherColours.length; i++) {
    var item = otherColours.item(i);
    if (item.classList.contains('active'))
      item.classList.remove('active');
  }

  this.classList.add('active');
}
