$(function() {

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
    $curr_post.animate({ width: '92%' }, function () {
      $curr_post.find('.close-post-box').show();
      $curr_post.find('.post-content-inline').load($curr_post.children('.post-url').attr('id') + ' .post-content', function () {
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

  function openHighlight() {
      var $current = $(this);
      $current.animate({
          width: $current.parent().width(),
      }, function() {
          $current.children('.highlight-content').slideDown();
      });
      $current.addClass('opened-highlight');
      $current.removeClass('closed-highlight');
      $current.off();
      $current.on('click', closeHighlight);
  }

  function closeHighlight() {
      var $current = $(this);
      var init_width = $current.parent().width() / 4;
      $current.children('.highlight-content').slideUp(400, function() {
          $current.animate({
              width: init_width
          });
      });
      $current.removeClass('opened-highlight');
      $current.addClass('closed-highlight');
      $current.off();
      $current.on('click', openHighlight);
  }

  $('.closed-highlight').on('click', openHighlight);

});
