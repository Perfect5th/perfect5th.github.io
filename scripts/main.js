$(document).ready(function() {
  $('.post-item').animate({
    opacity: 1,
    top: 0,
  }, 'slow', 'swing', function () {
    $(this).css({
      'z-index': 0,
    });
    $(this).parent().css('overflow', 'hidden');
  });

  $('.post-item').click(function () {
    var parent_width = $(this).parent().css('width');
    var this_padding = $(this).css('padding-right')
    $(this).animate({
      width: parent_width,
    });
    alert(this_padding)
  });
});
