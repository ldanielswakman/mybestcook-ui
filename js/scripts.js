var p = 2; // Parallax strength

$(document).ready(function() {

  // touch device detection
  $touch = ( navigator.userAgent.match(/(Android|webOS|iPad|iPhone|iPod|BlackBerry)/i) ? true : false );
  if ($touch) { $('body').addClass('isTouch') }
  var touchEvent = $touch ? 'touchstart' : 'click';

  // inserting random user info for mockup purposes
  $.ajax({
    url: 'http://api.randomuser.me/',
    dataType: 'json',
    success: function(data){
      $user = data['results'][0]['user'];
      console.log($user);
      $('.firstname').html($user['name']['first']);
      $('.lastname').html($user['name']['last']);
    }
  });
  
  $('nav #navbutton').click(function() {
    $(this).find('.ion').toggleClass('u-hide');
    $('nav').toggleClass('isActive');
  });

});

// parallax functionality
function scrollActions() {
  scroll = $(window).scrollTop();
  windowH = $(window).height();

  $('.slide').each(function() {
    var st = $(this).offset().top;
    if (!$touch) {
      prlx_offset = ($(this).attr('data-prlx-offset')) ? $(this).attr('data-prlx-offset') : 0;
      var pos = -(-prlx_offset - (scroll - st)/p)+'px';
      console.log((scroll - st)/p);
      $(this).css('background-position','center '+pos);
      // $(this).css('transform','translate3d(0px, '+pos+', 0px)');
    } else if ($ios) {
      $(this).css('background-attachment','scroll');
    }
  });

  if (scroll + $('nav').outerHeight() > ( $('.slide').outerHeight() + $('.slide').offset().top ) ) {
    $('nav').addClass('isWhite');
  } else {
    $('nav').removeClass('isWhite');
  }
}

$(window).scroll(function() { scrollActions(); });
$(window).resize(function() { scrollActions(); });
$(document).bind("scrollstart", function() { scrollActions(); });
$(document).bind("scrollstop", function() { scrollActions(); });