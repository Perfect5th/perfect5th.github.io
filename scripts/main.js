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

  /* $('.post-list > li > h2').click(() => {
    // $('.post-list > li').width(200);
  }); */
});
