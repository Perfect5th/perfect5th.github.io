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

  function openPost() {
    var $curr_post = $(this);
    $(this).animate({
      width: '95%',
    }, function () {
      $curr_post.find('.close-post-box').show();
      $.get($curr_post.children('.post-url').attr('id'), function (data) {
        $curr_post.append('<div class="post-content-inline" hidden>' + data + '</div>');
        $('.post-content-inline').slideDown(function () {
          $curr_post.off();
        });
      });
    });
  }

  $('.closed-post-box').on('click', openPost);

  $('.close-post-box').click(function () {
    var $curr_post = $(this).parent();
    var init_width = $curr_post.find('.post-item-title').width();
    $(this).hide();
    $curr_post.children('.post-content-inline').slideUp(function () {
      $(this).remove();
      $curr_post.animate({
        width: init_width,
      }, function () {
        $curr_post.on('click', openPost);
      });
    });
  });

});
