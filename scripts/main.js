document.addEventListener('DOMContentLoaded', initElements);

function initElements() {
  var p = document.getElementsByClassName('blog-list-item');

  for (var i = 0; i < p.length; i++) {
    var item = p.item(i);
    item.onmouseover = colorHeader;
    item.onmouseout = revertHeader;
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
