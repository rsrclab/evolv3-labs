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
      normalScrollElements: '.slider-holder',
      onLeave: function(origin, destination, direction){
        var leavingSection = this;

        // Handling Menu and Logo positions
        if(origin.index == 0 && direction =='down'){
          $('.header-nav').fadeIn();
        }
        else if(origin.index == 1 && direction == 'up'){
          $('.header-nav').fadeOut();
        }
        
        // Handling background
        if(destination.anchor) {
          $('.page-bg .section-bg[bg-anchor=' + destination.anchor + ']').addClass('active');
          $('.page-bg .section-bg:not([bg-anchor=' + destination.anchor + '])').removeClass('active');
          $('.page-media .section-media[media-anchor=' + destination.anchor + ']').addClass('active');
          $('.page-media .section-media:not([media-anchor=' + destination.anchor + '])').removeClass('active');
        }
      }
    });
    
    $('.section.slider .slider-holder').slick({
      slidesToScroll: 1,
      infinite: false,
      arrows: false,
      adaptiveHeight: false,
      variableWidth: true,
    });

    $('.section.slider .slider-holder').on('wheel', (function(e) {
      e.preventDefault();
    
      if (e.originalEvent.deltaY < 0) {
        $(this).slick('slickNext');
      } else {
        $(this).slick('slickPrev');
      }
    }));
  });
})(jQuery);
