var p = 2; // Parallax strength

$(document).ready(function() {

  // touch device detection
  $touch = ( navigator.userAgent.match(/(Android|webOS|iPad|iPhone|iPod|BlackBerry)/i) ? true : false );
  if ($touch) { $('body').addClass('isTouch') }
  var touchEvent = $touch ? 'touchstart' : 'click';

  // listeners
  $('.field').on('keypress', function() {
    $(this).removeClass('field-hasError');
    $(this).closest('.fieldset').find('.field-validation').fadeOut();
  });
});

// parallax functionality
function scrollActions() {
  scroll = $(window).scrollTop();
  windowH = $(window).height();

  if($(".slide").length > 0) {
    $('.slide').each(function() {
      var st = $(this).offset().top;
      if (!$touch) {
        prlx_offset = ($(this).attr('data-prlx-offset')) ? $(this).attr('data-prlx-offset') : 0;
        var pos = -(-prlx_offset - (scroll - st)/p)+'px';
        $(this).css('background-position','center '+pos);
        // $(this).css('transform','translate3d(0px, '+pos+', 0px)');
      } else if ($ios) {
        $(this).css('background-attachment','scroll');
      }
    });
    if (scroll + $('nav').outerHeight() < ( $('.slide').outerHeight() + $('.slide').offset().top ) ) {
      $('nav').removeClass('isWhite');
    } else {
      $('nav').addClass('isWhite');
    }
  }
  // if(($('.content-left').length + $('.content-right').length) > 0) {
  //   $('.content-left').each(function() {
  //     var pos = (scroll - $(this).offset().top) + 'px';
  //     console.log(pos);
  //     $(this).css('transform','translate3d(0px, '+pos+', 0px)');
  //   });
  // }
}
// closes form field message
function closeMessage(obj) {
  obj.closest('.field-message').fadeOut();
}
// submit button effects (UI mockup only)
function submitDummyEffects(obj) {
  $('.newsletter .field').each(function() {
    if ($(this).val().length == 0) {
      $(this).addClass('field-hasError');
      $(this).closest('.fieldset').find('.field-validation').html('Please fill in your email address.');
      $(this).closest('.fieldset').find('.field-validation').removeClass('u-hide');
    } else if ($(this).val().indexOf('@') == -1 || $(this).val().indexOf('.') == -1) {
      $(this).addClass('field-hasError');
      $(this).closest('.fieldset').find('.field-validation').html('Please fill in a valid email address.');
      $(this).closest('.fieldset').find('.field-validation').removeClass('u-hide');
    } else {
      $('.newsletter .field-validation').fadeOut();
      $('.newsletter .field').removeClass('field-hasError');
      obj.addClass('isBusy');
      $('.newsletter').find('.field').attr('disabled', 'true');
      setTimeout(function() {
        obj.removeClass('isBusy').addClass('isSuccess');
        $('.newsletter').find('.field-message').removeClass('u-hide');
      }, 1000);
      setTimeout(function() {
        obj.removeClass('isSuccess');
      }, 2000);
      setTimeout(function() {
        $('.newsletter').find('.field-message').fadeOut();
        $('.newsletter').find('.field').val('').removeAttr('disabled');
      }, 5000);
    }

  });
}

$(window).scroll(function() { scrollActions(); });
$(window).resize(function() { scrollActions(); });
$(document).bind("scrollstart", function() { scrollActions(); });
$(document).bind("scrollstop", function() { scrollActions(); });