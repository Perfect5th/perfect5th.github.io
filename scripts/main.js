$(document).ready(function() {
  $('.post-box').animate({
    opacity: 1,
    top: 0,
  }, 'slow', 'swing', function () {
    $(this).css({
      'z-index': 0,
    });
    $(this).parent().css('overflow', 'hidden');
  });

  $('.post-box').click(function () {
    $(this).animate({
      width: '97%',
    });
    $.get()
  });
});
