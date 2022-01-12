/**
 * This is script for index page
 */

(function ($) {
  $(document).ready(function () {

    $('.hamburger').on('click', function () {
      $(this).toggleClass('open');
      $('.header-menu').toggleClass('open');
    });

    $('.footer-menu__trigger').on('click', function () {
      $('.footer-menu').toggleClass('open');
    });

    var myFullPage = $('#fullpage').fullpage({
      anchors: ['intro', 'portfolio', 'life', 'mission', 'sev', 'fund', 'team'],
      menu: '#menu',
      onLeave: function(origin, destination, direction){
        var leavingSection = this;

        // Handling Menu and Logo positions
        if(origin.index == 0 && direction =='down'){
          $('.header-nav').fadeIn();

        }
        else if(origin.index == 1 && direction == 'up'){
          $('.header-nav').fadeOut();
        }
      }
    });
    
    $('.section.slider .slider-holder').slick({
      slidesToScroll: 1,
      infinite: false,
      arrows: false,
      variableWidth: true
    });

  });
})(jQuery);
